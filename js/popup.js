/*
 * @Author: bill Lin_k_Bill@163.com
 * @Date: 2020-06-24 10:29:20
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2023-02-03 16:05:43
 * @FilePath: /insert/full-chrome-plugin/js/popup.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
  let tabArr = []
  let index = null // 网页高亮下标
  let searchArr = null // 搜索结果返回数组

  $('#search-input').focus()
  // 收集网页信息，生成list
  chrome.tabs.getAllInWindow(null, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      tabArr.push({
        index: tabs[i].index,
        windowId: tabs[i].windowId,
        iconUrl: tabs[i].favIconUrl,
        title: tabs[i].title
      })

      let li = document.createElement('li')
      li.innerHTML = tabs[i].title
      li.setAttribute('data-item', JSON.stringify({
        index: tabs[i].index,
        windowId: tabs[i].windowId,
        iconUrl: tabs[i].favIconUrl,
        title: tabs[i].title
      }))
      document.getElementById('search-list').append(li)
    }
  });

  // 上下移动
  document.addEventListener('keydown', function (e) {
    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
      if (e.keyCode == 40) {
        if (index == null) {
          index = 0
        } else {
          index++
        }
      }
      if (e.keyCode == 38) {
        if ((index - 1) < 0) {
          index = $('li').length - 1
        } else {
          index--
        }
      }

      $('li').each(function (item) {
        if (index >= $('li').length) {
          index = 0
        }

        if (item == index) {
          $(this).addClass('highlight')
        } else {
          $(this).removeClass('highlight')
        }
        if (e.keyCode == 13 && (item == index)) {
          // alert($(this).attr('data-item'))
          let tabsData = JSON.parse($(this).attr('data-item'))
          chrome.tabs.highlight({
            windowId: tabsData.windowId,
            tabs: tabsData.index
          })
        }
      })
    }
  })
  // 搜索
  $("#search-input").on('input porpertychange', function (val) {
    let searchVal = $('#search-input').val().trim()
    if (searchVal) {
      searchArr = tabArr.filter(item => {
        console.log(item, searchVal)
        if (item.title.includes(searchVal)) {
          return item
        }
      })
      if (searchArr.length !== 0) {
        $('#search-list').empty()
        searchArr.forEach(tabItem => {
          let li = document.createElement('li')
          li.innerHTML = tabItem.title
          li.setAttribute('data-item', JSON.stringify(tabItem))
          document.getElementById('search-list').append(li)
        })
      }
    }
    if (searchArr.length == 0 || searchVal.trim() == '') {
      $('#search-list').empty()
      tabArr.forEach(tabItem => {
        let li = document.createElement('li')
        li.innerHTML = tabItem.title
        li.setAttribute('data-item', JSON.stringify(tabItem))
        document.getElementById('search-list').append(li)
      })
    }
  });
})
