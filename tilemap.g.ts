// Auto-generated code. Do not edit.
namespace myImages {

    helpers._registerFactory("image", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "myTiles.transparency16":return img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`;
        }
        return null;
    })

    helpers._registerFactory("animation", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

    helpers._registerFactory("song", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

}
// Auto-generated code. Do not edit.

// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level":
            case "level1":return tiles.createTilemap(hex`10000c001819191919191919191919191919191a1f201d1d1d1d202020201d1d1d1d201b1f1b020303041f20201b0a0c0c0b1f1b1f1b060701051f20201b0e11100d1f1b1f201a090818201d1d201a121318201b1f201b09081f1b020b1f1b12131f201b1f201b06051f1b09171f1b0e0d1f201b1f20201919201c09171e20191920201b1f202020201b02160f0b1f202020201b1f202020201b0614150d1f202020201b1f20202020201919191920202020201b1e1d1d1d1d1d1d1d1d1d1d1d1d1d1d1c`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . 2 2 2 2 . . . . 2 2 2 2 . . 
. . 2 2 2 2 . . . . 2 2 2 2 . . 
. . . 2 2 . . . . . . 2 2 . . . 
. . . 2 2 . . 2 2 . . 2 2 . . . 
. . . 2 2 . . 2 2 . . 2 2 . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenInnerNorthWest,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenInnerNorthEast,sprites.dungeon.greenOuterEast1,sprites.dungeon.greenOuterWest1,sprites.dungeon.purpleOuterNorthWest,sprites.dungeon.purpleOuterNorthEast,sprites.dungeon.purpleOuterNorth0,sprites.dungeon.purpleOuterSouthWest,sprites.dungeon.purpleOuterSouthEast,sprites.dungeon.purpleInnerSouthWest,sprites.dungeon.purpleInnerNorthWest,sprites.dungeon.purpleInnerNorthEast,sprites.dungeon.purpleOuterWest1,sprites.dungeon.purpleOuterEast1,sprites.dungeon.greenOuterSouth1,sprites.dungeon.purpleOuterSouth1,sprites.dungeon.greenInnerSouthEast,sprites.dungeon.purpleOuterEast0,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundNorth,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundSouthEast0,sprites.dungeon.darkGroundSouth,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundCenter], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return myTiles.transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
