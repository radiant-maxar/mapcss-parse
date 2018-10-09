# Schema

mapcss-parse will transform this...

```css
way[amenity=clinic][!healthcare]:closed{
    throwError: "[amenity=clinic]: MapRules preset 'Health Clinic': may be coupled with healthcare";
}
node[amenity=clinic][!healthcare]{
    throwError: "[amenity=clinic]: MapRules preset 'Health Clinic': may be coupled with healthcare";
}
way[amenity=marketplace][!name]:closed{
    throwWarning: "[amenity=marketplace]: MapRules preset 'Market': must be coupled with name";
}
way[amenity=marketplace][!opening_hours]:closed{
    throwWarning: "[amenity=marketplace]: MapRules preset 'Market': must be coupled with opening_hours";
}
way[amenity=marketplace][opening_hours][opening_hours!~/^24\/7$|^sunrise to sunset$/]:closed{
    throwWarning: "[amenity=marketplace]: opening_hours may be '24/7','sunrise to sunset'";
}
way[amenity=marketplace][!height]:closed{
    throwWarning: "[amenity=marketplace]: MapRules preset 'Market': must be coupled with height";
}
way[amenity=marketplace][height][height <= 0]:closed{
    throwWarning: "[amenity=marketplace]: height must be greater than 0";
}
node[amenity=drinking_water][man_made=water_tap][!name]{
    throwWarning: "[amenity=drinking_water][man_made=water_tap]: MapRules preset 'Water Tap': must be coupled with name";
}
node[amenity=school]{
    throwError: "[amenity=school]: [amenity cannot be coupled with school]";
}
way[amenity=school]{
    throwError: "[amenity=school]: [amenity cannot be coupled with school]";
}
```

into this...

```JSON
[
    {
        "geometry":"closedway",
        "equals":{"amenity":"clinic"},
        "absence":"healthcare",
        "error":"throwError: \"[amenity=clinic]: MapRules preset 'Health Clinic': may be coupled with healthcare\";"
    },
    {
        "geometry":"node",
        "equals":{"amenity":"clinic"},
        "absence":"healthcare",
        "error":"throwError: \"[amenity=clinic]: MapRules preset 'Health Clinic': may be coupled with healthcare\";"
    },
    {
        "geometry":"closedway",
        "equals":{"amenity":"marketplace"},
        "absence":"name",
        "warning":"throwWarning: \"[amenity=marketplace]: MapRules preset 'Market': must be coupled with name\";"
    },
    {
        "geometry":"closedway",
        "equals":{"amenity":"marketplace"},
        "absence":"opening_hours",
        "warning":"throwWarning: \"[amenity=marketplace]: MapRules preset 'Market': must be coupled with opening_hours\";"
    },
    {
        "geometry":"closedway",
        "equals":{"amenity":"marketplace"},
        "presence":"opening_hours",
        "negativeRegex":{"opening_hours":["^24\\/7$","^sunrise to sunset$"]},
        "warning":"throwWarning: \"[amenity=marketplace]: opening_hours may be '24/7','sunrise to sunset'\";"
    },
    {
        "geometry":"closedway",
        "equals":{"amenity":"marketplace"},
        "absence":"height",
        "warning":"throwWarning: \"[amenity=marketplace]: MapRules preset 'Market': must be coupled with height\";"
    },
    {
        "geometry":"closedway",
        "equals":{"amenity":"marketplace"},
        "presence":"height",
        "lessThanEqual: {"height": "lessThanEqual":0},
        "warning":"throwWarning: \"[amenity=marketplace]: height must be greater than 0\";"
    },
    {
        "geometry":"node",
        "equals":{"man_made":"water_tap"},
        "absence":"name",
        "warning":"throwWarning: \"[amenity=drinking_water][man_made=water_tap]: MapRules preset 'Water Tap': must be coupled with name\";"
    },
    {
        "geometry":"node",
        "equals":{"amenity":"school"},
        "error":"throwError: \"[amenity=school]: [amenity cannot be coupled with school]\";"
    },
    {
        "geometry":"way",
        "equals":{"amenity":"school"},
        "error":"throwError: \"[amenity=school]: [amenity cannot be coupled with school]\";"
    }
]
```


## Parsed Config Schema

| key              | value   | description                                                                                    |
| ---------------- | :------ | :--------------------------------------------------------------------------------------------- |
| geometry         | string  | geometry type MapCSS is intended to match                                                      |
| equals           | object  | object with key/value pair MapCSS is intended to match                                         |
| notEqual         | string  | object with key/value pair MapCSS is not intended to match                                     |
| presence         | string  | tag key MapCSS is intended to match                                                            |
| absence          | string  | tag key MapCSS is not intended to match                                                        |
| positiveRegex    | object  | object with key and list of regular expressions MapCSS is intended to match                    |
| negativeRegex    | object  | object with key and list of regular expressions MapCSS is not intended to match                |
| lessThan*        | object  | object with equality type (less than OR less than or equal to) and nested key/value pair       |
| greaterThan*     | object  | object with equality type (greater than OR greater than or equal to) and nested key/value pair |
| error            | string  | string that should be shown as an error message if primitive matches its MapCSS selectors      |
| warning          | string  | string that should be shown as a warning message if primitive matches its MapCSS selectors     |