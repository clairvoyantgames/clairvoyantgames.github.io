define(function (require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Scrollview = require('famous/views/Scrollview');
    var RenderNode = require('famous/core/RenderNode');

    // create the main context
    var mainContext = Engine.createContext();

    var scrollview = new Scrollview();
    var surfaces = [];

    scrollview.sequenceFrom(surfaces);

    var booth = new ImageSurface({
        content: '/img/booth.svg',
    });
    
    var testModifier = new Modifier();
    
    testModifier.transformFrom(function(){
        return Transform.translate(( mainContext.getSize()[0] / 2) - (width * scale) / 2, 0, 0);
    });
    
     var titleSurface = new Surface({
            size: [true, true],
            content: 'test',
            properties: {
                color: 'white',
                fontFamily: 'AvenirNextCondensed-DemiBold',
                fontSize: '12px',
                textTransform: 'uppercase',
                pointerEvents : 'none'
            }
        });
    
    booth.state = new Modifier();

    var scale = 1,
        width = 320,
        height = 774;

    booth.state.sizeFrom(function () {        
        if (height <= mainContext.getSize()[1]) {
            scale = 2;
        } else {
            scale = 1;
        }
        return [width * scale, height * scale];
    });

    booth.state.transformFrom(function () {
        return Transform.translate(( mainContext.getSize()[0] / 2) - (width * scale) / 2, 0, 0);
    });

    booth.node = new RenderNode();

    booth.node.add(booth.state).add(booth);

    booth.pipe(scrollview);

    surfaces.push(booth.node);

    surfaces.push(new Surface({
        size: [undefined, 50],
        content: "Copyright © 2014 Clairvoyant Games. All rights reserved. Built with Famo.us.",
        classes: ["footer"],
        properties: {
            lineHeight: "20px",
            textAlign: "center"
        }
    }));

    mainContext.add(scrollview);
    
    mainContext.add(testModifier).add(titleSurface);
});