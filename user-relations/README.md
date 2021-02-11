# User Relations

```json
{
    "$schema": "sia://skystandards.hns/v1/userRelations.schema.json", // Type definition with spec version number (1)
    "userId":"d448f1562c20dbafa42badd9f88560cd1adb2f177b30f0aa048cb243e55d37bd", // This is the global userId used by SkyID, not the app-specific public key (To ensure interoperability with other skapps)
    "relationType": "following", // one of ["following","followers","blocked"]
    "relations": { // global SkyID userId of users in relation to this user
        "54ee119b9bce2790c7a3baed1ddf968a32bab4d7710270acf85f28a9dac0e66a":{
            "ts": 1606169889148 // OPTIONAL, unix timestamp in milliseconds when this relation was created
        },
        "202f98e8a7baaa82b7003c716a1f76d07e8dacde5086197541a77c8ab1050015":{},
        "86939f3af93113fb5f11056828f7019e875a07190f5c4b07e90593f5d9929965":{},
        "d873ca08a7ffe36a8b19fa5d82cb34cfad70d2f0b3d5b1f2448a2054703e36d4":{}
    }
}
```
