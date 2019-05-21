(function (FroalaEditor) {

  // Define the plugin.
  // The editor parameter is the current instance.
  FroalaEditor.PLUGINS.myPlugin = function (editor) {

    // The start point for your plugin.
    function _init () {
    	 // Var to cache last selected image instance
       let selectedImage = {};
       editor.events.on('commands.before',  function (e, editors, cmd, param1, param2) {
            if(e == 'imageCaption'){	
              //if image has a caption then it going to be removed after the command exec.
              selectedImage.html =	editor.image.get();
              selectedImage.hasCaption = editor.image.hasCaption();
            }
         });
       	  		
      editor.events.on('commands.after',  function (e, editors, cmd, param1, param2) {
       
       if(e == 'imageSize'){
       
            //get the selected image & cashe it for Adjusting image width while image has caption	
            selectedImage.html =	editor.image.get();
            selectedImage.hasCaption = editor.image.hasCaption();
       
       }else if(e == 'imageSetSize'){

             //Adjusting image width while image has caption			
            //if image has a caption
            if( selectedImage.hasCaption ){
              if (/Edge/.test(navigator.userAgent)) {   //Fix EDGE bug
                //get the entered width
                let width = $('.fr-image-size-layer input[name="width"]' ).val();
                //if the entered value is just number add 'px' to it
                let isIntegerOnly = width.match(/^\d+$/g);
                if(isIntegerOnly !== null) width += 'px';
                //Add the width to the caption span
                 selectedImage.html.parents('.fr-img-caption').css('width',width);
              }	      
              //remove the width from the image itself to take 100% of the caption width	  	
               selectedImage.html.css('width','');
               selectedImage.html.parents('.fr-img-caption').css('width','');
               editor.events.trigger('blur');    
            }

        }else if(e == 'imageCaption'){	 

          if( selectedImage.hasCaption ){            
            var $imgWrap = selectedImage.html.parents('.fr-img-wrap');
            var wrapWidth = $imgWrap[0].style.width;
            if(wrapWidth){
            selectedImage.html.css('width',wrapWidth);
            editor.events.trigger('blur');   
          }
        }
       }      
     }); // End commands.after
    }
    
    return {
      _init: _init
    }
  }
})(FroalaEditor);
