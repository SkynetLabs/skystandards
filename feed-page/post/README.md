# Post

```json
{
    "$schema": "sia://skystandards.hns/v1/post.schema.json", // Type definition with spec version number (1)
    "id": 5, // Required, this id MUST be unique on the page this post is on. For example, this post could have the full id d448f1562c20dbafa42badd9f88560cd1adb2f177b30f0aa048cb243e55d37bd/feed/posts/1/5 (userId/structure/feedId/pageId/postId)

    "repostOf":"5335179d69a3191ccb6329dcc0d2aaac2cada7ce145cbbd5543c8c2ee97e2a4a/feed/posts/0/11", // Optional, full ID of the post being reposted (If this key is present, this post is a repost and does not need to contain a "content")
    "commentTo":"5335179d69a3191ccb6329dcc0d2aaac2cada7ce145cbbd5543c8c2ee97e2a4a/feed/posts/0/9", // Optional, full ID of the post this posts is commenting on
    "parentHash":"sha256:24126b48452ce0243ae0f6bd3a3e0f9ee06ac01d5dab557c365b3e1bb8972fa5", // sha256sum of the JSON string of the post being reposted or commented on to prevent edits

    "content": { // Every field in this map is OPTIONAL, if not specified otherwise

        "media": { // A media object can contain an image, video, audio or combination of all of them
            "mediaDuration": 1235312612, // duration of video or audio in milliseconds (int)

            // video, audio and image follow the same format
            // more specific formats should be listed FIRST
            // if vcodec is specified, the file contains video (otherwise null)
            // if acodec is specified, the file contains audio (otherwise null)
            "video:": [ // video content with different resolution and file formats
                {
                    "ext": "mp4",
                    "vcodec": "avc1.4d400b",
                    "fps": 25, // optional
                    "w": 1920, // width
                    "h": 1080, // height
                    "url": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA"
                },
                {
                    "ext": "webm",
                    "vcodec": "vp9",
                    "acodec": "mp4a.40.2",
                    "abr": 96, // kbps of the audio
                    "fps": 25, // optional
                    "w": 1920, // width
                    "h": 1080, // height
                    "url": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA/1920x1080_version.webm"
                },
                {
                    "ext": "webm",
                    "vcodec": "vp9",
                    "acodec": "mp4a.40.2",
                    "abr": 96, // kbps of the audio
                    "fps": 25, // optional
                    "w": 1280, // width
                    "h": 720, // height
                    "url": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA/1280x720_version.webm"
                }
            ],
            "audio": [ // audio content with different resolution and file formats
                {
                    "ext": "mp3",
                    "acodec": "mp3",
                    "url": "sia://_A2zt5SKoqwnnZU4cBF8uBycSKULXMyeg1c5ZISBr2Q3dA"
                },
                {
                    "ext": "mp3",
                    "acodec": "mp3",
                    "abr": 192, // kbps of the audio
                    "url": "sia://_A2zt5SKoqwnnZU4cBF8uBycSKULXMyeg1c5ZISBr2Q3dA"
                }
            ],
            "image": [ // image content with different resolution and file formats
                // also used as thumbnail when video is present
                {
                    "ext": "png",
                    "w": 1920, // width
                    "h": 1080, // height
                    "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
                },
                {
                    "ext": "png",
                    "w": 1280, // width
                    "h": 720, // height
                    "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
                },
                {
                    "ext": "jpeg",
                    "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
                }
            ],
            "aspectRatio": 1.457858769931663, // Aspect ratio of the image and the video
            "blurHash": "L@L4$+00j@xuayjtfQayofayfQj[" // BlurHash of the image shown while loading
        },
        "gallery": [ // List of media objects in a "gallery", uses a list of the media structure
            // can be show in a carousel or list
            // useful for app screenshots or galleries
            // NOT TO BE USED for something like music albums, because it prevents individual tracks from being referenced, saved, rated, reposted, ...
            {
                "mediaDuration": 1235312612,
                "video:": [
                    {
                        "ext": "mp4",
                        "vcodec": "avc1.4d400b",
                        "fps": 25, // optional
                        "w": 1920, // width
                        "h": 1080, // height
                        "url": "sia://CACqf4NlIMlA0CCCieYGjpViPGyfyJ4v1x3bmuCKZX8FKA"
                    }
                ],
                "image": [
                    {
                        "ext": "jpeg",
                        "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
                    }
                ],
                "aspectRatio": 1.457858769931663, // Aspect ratio of the image and the video
                "blurHash": "L@L4$+00j@xuayjtfQayofayfQj[" // BlurHash of the image shown while loading
            }

        ],
        "link": "sia://skyfeed.hns", // Can be used as a link to a url referred by this post
        "linkTitle": "SkyFeed - Decentralized social network", // title of the url, only used for preview

        "title": "This is a title", // optional, higlighted and used as title of the post when available
        "text": "Lorem ipsum dolor sit amet.", // REQUIRED Text content and/or description
        "textContentType":"text/plain", // text/plain by default, also allows "text/html" and "text/markdown"
        "tags":[ // Contains tags that have a special meaning used by the skapp to display it in a specific way or filter it out
            "spoiler", // Used for spoilers
            "nsfw", // Used for NSFW content
            "skapp" // Used for skapps
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
            },
            "skapp": { // extension data for skapps (just referenced as an example, not part of the spec)
                "logo":"sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
            }
        },
        "ts": 1606169889148, // Upload/posting date (Using a unix timestamp because it's compact and prevents timezone-specific bugs)
    }
}
```
