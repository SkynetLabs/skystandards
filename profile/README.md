# Profile

## Scopes concept

"Scope-specific" data should be saved using the sub-keypair which makes the most sense for the content.

### Examples for scopes

SkyID has access to every scope and manages the master key
`skysocial`: Social graph (all `userRelations` objects)
`skyfeed`: All public data organized in a "feed" (uses `feedPage` objects) [posts, comments, reposts, reactions]
`skylive`: Livestreams
`skymessage`: Chat messages
`something with storage`: Private file storage
`skapp`: skapp.io specific developer and skapp data

### Examples how Skapps can use this scopes

SkyFeed could ask for `skyfeed` and `skysocial` to post content and modify the social graph
SkyLive could ask for `skylive` and `skysocial` to discover livestreams from user's you're following on SkyFeed for example
MARStorage could ask for `something with storage` and `skysocial` to load the the social graph and share files
Skapp.io could ask for `skapp`, `skyfeed` and `skysocial` to manage skapp-specific data, post new apps on the developer's feed and discover skapps from user's you're following
For videos organized in a time-ordered feed which also supports social interactions, the `skyfeed` scope could make sense.

### Advantages

- All data can be requested by other skapps
- Apps only get the access they need -> secure
- The user can see a good overview of which data a skapp requests and take an educated decision
- Individual scopes can have descriptions and icons to make the easier to identify across skapps
- New scopes can be added at anytime and any skapp can request them

### Disadvantages

- Added complexity, but this can easily be abstracted away by using a SDK and will make developer's life a lot easier in the long term, especially with multiple skapps using and modifying the same data

## Profile structure

Based on the current SkyID profile structure with some modifications.

```json
{
    "$schema": "sia://skystandards.hns/v1/profile.schema.json", // Type definition with spec version number (1)
    "username": "USERNAME", // Non-unique username (can contain spaces)
    "aboutMe": "Lorem ipsum dolor sit amet.", // Short about me text
    "location": "Somewhere on earth", // Free text
    "avatar" : [ // Uses the same media/image format like in Post (all of them can be in one skyfile and specify a path)
        {
            "ext": "png",
            "w": 128, // width
            "h": 128, // height
            "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
        },
        {
            "ext": "jpeg",
            "w": 512, // width
            "h": 512, // height
            "url": "sia://IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
        }
    ],
    "scopes":{ // A skapp can request multiple "scopes".
        "skysocial":{
            "url":"https://skysocial.hns/",
            "publicKey":"5462ba9e866e4136f21e2fe0482d4a9fea7e8b52aa5a17141d9c4fe8cf381e8a"
        },
        "skyfeed":{
            "url":"https://skyfeed.hns/",
            "publicKey":"ba98c7b98a798cb7c809a886563ba3cb456ac8b6a3cb9ca9bacb3a42cb6a67cb"
        },
    }
}
```
