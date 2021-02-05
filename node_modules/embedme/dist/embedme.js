#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const embedme_lib_1 = require("./embedme.lib");
const gitignore_parser_1 = require("gitignore-parser");
const commander_1 = __importDefault(require("commander"));
const glob_1 = __importDefault(require("glob"));
const pkg = require('../package.json');
commander_1.default
    .version(pkg.version)
    .arguments('[...files]')
    .option('--verify', `Verify that running embedme would result in no changes. Useful for CI`)
    .option('--dry-run', `Run embedme as usual, but don't write`)
    .option('--source-root [directory]', `Directory your source files live in in order to shorten the comment line in code fence`)
    .option('--silent', `No console output`)
    .option('--stdout', `Output resulting file to stdout (don't rewrite original)`)
    .option('--strip-embed-comment', `Remove the comments from the code fence. *Must* be run with --stdout flag`)
    .parse(process.argv);
const { args: sourceFilesInput } = commander_1.default;
const options = commander_1.default;
const log = embedme_lib_1.logBuilder(options);
const errorLog = embedme_lib_1.logBuilder(options, true);
let sourceFiles = sourceFilesInput.reduce((files, file) => {
    if (glob_1.default.hasMagic(file)) {
        files.push(...glob_1.default.sync(file));
    }
    else {
        files.push(file);
    }
    return files;
}, []);
if (sourceFiles.length > 1) {
    log(chalk => chalk.yellow(`More than one file matched your input, results will be concatenated in stdout`));
}
else if (sourceFiles.length === 0) {
    log(chalk => chalk.yellow(`No files matched your input`));
    process.exit(0);
}
if (options.stripEmbedComment && !options.stdout) {
    errorLog(chalk => chalk.red(`If you use the --strip-embed-comment flag, you must use the --stdout flag and redirect the result to your destination file, otherwise your source file(s) will be rewritten and comment source is lost.`));
    process.exit(1);
}
if (options.verify) {
    log(chalk => chalk.blue(`Verifying...`));
}
else if (options.dryRun) {
    log(chalk => chalk.blue(`Doing a dry run...`));
}
else if (options.stdout) {
    log(chalk => chalk.blue(`Outputting to stdout...`));
}
else {
    log(chalk => chalk.blue(`Embedding...`));
}
const ignoreFile = ['.embedmeignore', '.gitignore'].map(f => path_1.relative(process.cwd(), f)).find(fs_1.existsSync);
if (ignoreFile) {
    const ignore = gitignore_parser_1.compile(fs_1.readFileSync(ignoreFile, 'utf-8'));
    const filtered = sourceFiles.filter(ignore.accepts);
    log(chalk => chalk.blue(`Skipped ${sourceFiles.length - filtered.length} files ignored in '${ignoreFile}'`));
    sourceFiles = filtered;
    if (sourceFiles.length === 0) {
        log(chalk => chalk.yellow(`All matching files were ignored in '${ignoreFile}'`));
        process.exit(0);
    }
}
sourceFiles.forEach((source, i) => {
    if (i > 0) {
        log(chalk => chalk.gray(`---`));
    }
    const resolvedPath = path_1.resolve(source);
    if (!fs_1.existsSync(source)) {
        errorLog(chalk => chalk.red(`  File ${chalk.underline(path_1.relative(process.cwd(), resolvedPath))} does not exist.`));
        process.exit(1);
        return;
    }
    const sourceText = fs_1.readFileSync(source, 'utf-8');
    const outText = embedme_lib_1.embedme(sourceText, resolvedPath, options);
    if (options.verify) {
        if (sourceText !== outText) {
            errorLog(chalk => chalk.red(`Diff detected, exiting 1`));
            process.exit(1);
        }
    }
    else if (options.stdout) {
        process.stdout.write(outText);
    }
    else if (!options.dryRun) {
        if (sourceText !== outText) {
            log(chalk => chalk.magenta(`  Writing ${chalk.underline(path_1.relative(process.cwd(), resolvedPath))} with embedded changes.`));
            fs_1.writeFileSync(source, outText);
        }
        else {
            log(chalk => chalk.magenta(`  No changes to write for ${chalk.underline(path_1.relative(process.cwd(), resolvedPath))}`));
        }
    }
});
