/*! CausewayLivestax v1.0.0-1
Copyright 1999-2015 Causeway Software Solutions Limited. */
(function() {
  var $alphabeticalList = $('.alphabetical-list');


  function sortList(unOrderedList) {

    var arrayList = $(" > li", unOrderedList);

    arrayList.sort(function (a, b) {
      // convert to compare strings
      a = $(a).text();
      b = $(b).text();

      // compare
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

    unOrderedList.append(arrayList);

  }

  function addGroupText(unOrderedList) {

    var firstLi = $(" > li:first", unOrderedList);
    var groupText = firstLi.text().substr(0,1).toUpperCase();
    firstLi.before("<li class='list-group-item disabled'>"+groupText+"</li>");

    $(" > li", unOrderedList).each(function() {
      var nextGroupText = $(this).text().substr(0,1).toUpperCase();
      if(nextGroupText !== groupText) {
        groupText = nextGroupText;
        $(this).before("<li class='list-group-item disabled'>"+nextGroupText+"</li>");
      }
    });

  }

  function filterList(searchInput, list) {

    var val = $.trim(searchInput.val()).replace(/ +/g, ' ').toLowerCase();

    list.show().filter(function() {

      var $this = $(this),
        originalListText = $this.text();

      $this.text(originalListText);

      var listText = $this.text().replace(/\s+/g, ' '),
        listTextLower = listText.toLowerCase(),
        replaceText = listText.substr(listTextLower.indexOf(val), val.length),
        newText = listText.replace(replaceText, "<span class='search-highlight'>" + replaceText + "</span>");

      if(listTextLower.indexOf(val) >= 0) {
        $this.html(newText);
      }

      return !~listTextLower.indexOf(val);

    }).hide();
  }

  function filterGroupList(unOrderedList) {
    var $groupList = $("li.list-group-item.disabled", unOrderedList);

    $groupList.show().filter(function() {

      var $this = $(this),
        groupText = $this.text().toUpperCase(),
        nextListText = $this.nextAll("li:visible").text().substr(0, 1).toUpperCase();

      if(groupText !== nextListText) {
        return $this;
      }

    }).hide();
  }

  function toggleIcon($searchInput) {
    var $this = $searchInput,
      icon = $this.next('.fa');
    if(!!$this.val()) {
      icon.removeClass('fa-search').addClass('fa-remove');
    } else {
      icon.removeClass('fa-remove').addClass('fa-search');
    }
  }

  $alphabeticalList.each(function() {
    var $this = $(this),

      $searchInput = $("input[data-filter-client=true]", $this),
      $unOrderedList = $searchInput.length > 0 ? $("ul"+$searchInput.data('filter-target')) : $("ul.list-group", $this),
      $list = $(' > .list-group-item', $unOrderedList).not(".list-group-item.disabled");

    sortList($unOrderedList);
    addGroupText($unOrderedList);
    $searchInput.keyup(function() {
      toggleIcon($searchInput);
      filterList($searchInput, $list);
      filterGroupList($unOrderedList);
    });
  });

  $(document).on('click', '.fa-remove', function(){
    $(this).prev('.search').val('').keyup();
  })

}());
(function() {
  var nestedList = $('.nested-list'),
    toggleFunction = function(element) {
      var $this = element;
      //  Change Icon
      $('.toggle-switch:first', $this).toggleClass('open');
      $this.toggleClass('open');
      //  Open Child List
      $this.children('.nested-child-list').slideToggle();
    };

  nestedList.each(function() {
    var nestedChildList = $('.nested-child-list', $(this));
    //Hide
    nestedChildList.hide();
  });

  //Handlers
  $(document).on('click', '.nested-parent-list', function(event) {
    event.stopPropagation();
    toggleFunction($(this));
  });
  $(document).on('click', '.nested-child-list', function(event) {
    event.stopPropagation();
  });

}());

(function(){
  //  Nested Table
  var nestedTable = $('.nested-table');
  nestedTable.each(function() {
    var $that = $(this),
      nestedChildTable = $('.nested-child-table', $that),
      nestedParentTable = $('.nested-parent-table', $that),
      colGroup = $('colgroup', $that).clone(),
      tablesToBeColGrouped = $that.find('.table');

    //Equalize columns
    tablesToBeColGrouped.prepend(colGroup);

    //Wrap
    $('.table', nestedChildTable).wrap("<div class='wrapped-table'>");

    //Hide
    $('.wrapped-table', nestedChildTable).hide();


    nestedParentTable.on('click', function() {
      var $this = $(this);
      //  Change Icon
      $('.toggle-switch', $this).toggleClass('open');
      $this.toggleClass('open');
      //  Open Child Table
      $('.wrapped-table:first', $this.next('.nested-child-table')).slideToggle();

    });
  })
}());
