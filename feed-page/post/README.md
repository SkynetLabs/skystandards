# Post

```json
{
    "$schema": "sia://skystandards.hns/v1/post.schema.json", // Type definition with spec version number (1)
    "id": 5, // Required, this id MUST be unique on the page this post is on. For example, this post could have the full id d448f1562c20dbafa42badd9f88560cd1adb2f177b30f0aa048cb243e55d37bd/feed/posts/1/5 (userId/structure/feedId/pageId/postId)

    "repostOf":"5335179d69a3191ccb6329dcc0d2aaac2cada7ce145cbbd5543c8c2ee97e2a4a/feed/posts/0/11", // Optional, full ID of the post being reposted (If this key is present, this post is a repost and does not need to contain a "content")
    "commentTo":"5335179d69a3191ccb6329dcc0d2aaac2cada7ce145cbbd5543c8c2ee97e2a4a/feed/posts/0/9", // Optional, full ID of the post this posts is commenting on
    "parentHash":"sha256:24126b48452ce0243ae0f6bd3a3e0f9ee06ac01d5dab557c365b3e1bb8972fa5", // sha256sum of the JSON string of the post being reposted or commented on to prevent edits

    "content": { // Every field in this map is OPTIONAL, if not specified otherwise
        "mediaDuration": 1235312612, // duration of video or audio in milliseconds (int)

        // video, audio and image follow the format FILE_FORMAT+RESOLUTION_OR_QUALITY
        // RESOLUTION_OR_QUALITY is optional, more specific formats should be listed FIRST
        "video:": { // video content with different resolution and file formats
            "mp4_noaudio+1920x1080": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA",
            "mp4+1920x1080": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA/1920x1080_version.mp4",
            "mp4+1280x720": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA/1280x720_version.mp4"
        },
        "audio": { // audio content with different resolution and file formats
            "mp3+128k": "sia://_A2zt5SKoqwnnZU4cBF8uBycSKULXMyeg1c5ZISBr2Q3dA",
            "mp3": "sia://_A2zt5SKoqwnnZU4cBF8uBycSKULXMyeg1c5ZISBr2Q3dA",
        },
        "image": { // image content with different resolution and file formats
            // also used as thumbnail when video is present
            "png+1920x1080": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ",
            "png+1280x720": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ",
            "jpeg": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ",
        },
        "title": "This is a title", // optional, higlighted and used as title of the post when available
        "text": "Lorem ipsum dolor sit amet.", // REQUIRED Text content and/or description
        "textContentType":"text/plain", // text/plain by default
        "aspectRatio": 1.457858769931663, // Aspect ratio of the image and the video
        "blurHash": "L@L4$+00j@xuayjtfQayofayfQj[", // BlurHash of the image shown while loading
        "tags":[ // Contains tags that have a special meaning used by the skapp to display it in a specific way or filter it out
            "spoiler", // Used for spoilers
            "nsfw" // Used for NSFW content            
        ],
        "topics":[ //  Can contain different topics (hashtags) this post fits into.
            "siatech",
            "skynet",
            "siacoin",
            "crypto"
        ],
        "ext": { // Can be used to attach metadata from external platforms mirrored to Skynet (for example YouTube) or just extra metadata not covered by this spec
            "yt": {
                "videoId": "mzX1AX_MSh0",
                "channelId": "UCYtlUu6bUghAca0ADmlxCKw",
                "channelName": "SiaTV Official",
                "views": 415
            }, 
            "app": { // Metadata about the app used to create this post
                "name": "SkyFeed",
                "location": "sia://skyfeed.hns"
            }
        },
        "ts": 1606169889148, // Upload/posting date (Using a unix timestamp because it's compact and prevents timezone-specific bugs)
    }
}
```
