whale.contextMenus.create({
    title: '이미지 검색하기',
    contexts: ['image'],
    onclick: searchImg
});


function searchImg(item) {
    whale.sidebarAction.show();
    whale.storage.local.set({
    message: item.srcUrl
    }, () => {
    if (!whale.runtime.lastError) {
        whale.sidebarAction.show();
    }
    });
}