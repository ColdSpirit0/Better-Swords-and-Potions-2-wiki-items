// ==UserScript==
// @name        Better SP2 wiki items
// @namespace   SP2W
// @include     http://www.edgebee.com/wiki/index.php?title=Shopkeeper
// @include     http://www.edgebee.com/wiki/index.php?title=Blacksmith
// @include     http://www.edgebee.com/wiki/index.php?title=Carpenter
// @include     http://www.edgebee.com/wiki/index.php?title=Druid
// @include     http://www.edgebee.com/wiki/index.php?title=Tailor
// @include     http://www.edgebee.com/wiki/index.php?title=Armorer
// @include     http://www.edgebee.com/wiki/index.php?title=Leather-worker
// @include     http://www.edgebee.com/wiki/index.php?title=Bowyer
// @include     http://www.edgebee.com/wiki/index.php?title=Sorceress
// @include     http://www.edgebee.com/wiki/index.php?title=Tinkerer
// @include     http://www.edgebee.com/wiki/index.php?title=Jeweler
// @include     http://www.edgebee.com/wiki/index.php?title=Luthier
// @include     http://www.edgebee.com/wiki/index.php?title=Enchanter
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @grant       GM_addStyle
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);
GM_addStyle('.spoilerLink {display: inline-block; border: none !important; color: black !important; text-decoration: none !important; padding: none !important; min-width: 180px; min-height:240px;};');
GM_addStyle('.attrContainer {color: black; font-size: 8pt;');
GM_addStyle('.recipeImage {height: 100px};');
GM_addStyle('.attrContainer tr {border-bottom: 1px sold darkgray; display: table; width: 100%};');
GM_addStyle('.attrContainer td {width: 50%};');

$(function () {
$(document).ready(function()
{
  //get all items on the page
  var $craftItems = $('td:has(.spoilerLink)');  
  $($craftItems).each(function()
  {    
    var $craftItem = this;    
    
    
    //get first link of the item
    var $recipeLink = $('.spoiler a:first', $craftItem).attr('href');
    
    $.get($recipeLink, function($recipePage)
    {
      //last image of the page
      var $imgLink = $('table img:last', $recipePage).attr('src');
      
      //append image to item element
      var $recipeImage = $('<img>', {
        src: $imgLink,
        class: 'recipeImage',
      });
      
      var $infoContainer = $('<div>', {
        class: 'infoContainer',
      });    
      $($infoContainer).append($recipeImage);
      
      //get item level      
      $('.spoilerLink', $craftItem).text($('.spoiler td:first', $craftItem).text());
      
      
      //add item attributes
      var $itemAttributes = $('.spoiler tbody', $craftItem);
      var $attrPrice = $('tr:has(td:contains(Sell Price))', $itemAttributes);
      var $attrResources = $('tr:has(td:contains(Resources))', $itemAttributes);
      var $attrSpeed = $('tr:has(td:contains(Crafting Speed))', $itemAttributes);
      var $attrUnlocks = $('tr:has(td:contains(Unlocks))', $itemAttributes);
      var $attrNfR = $('tr:has(td:contains(Needed for Recipes))', $itemAttributes);
      
    
      var $attrContainer = $('<div>', {
        class: 'attrContainer',
      });

      $($attrContainer).append($attrPrice);
      $($attrContainer).append($attrResources);
      $($attrContainer).append($attrUnlocks);
      $($attrContainer).append($attrNfR);
      
      $($infoContainer).append($attrContainer);
      $('.spoilerLink', $craftItem).append($infoContainer);
    });
  });
  
  //some stuff
  $('#bodyContent table:has(th:contains(Swords)):first').css('width', '100%');
  
});
}); 
