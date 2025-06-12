hexo.extend.filter.register('after_post_render', (post) => {
    if (post.content) {
        const uniqueIdStore = {};
        post.content = post.content.replace(/<h1>(.*?)<\/h1>/g, function (match, p1) {
            const cleanId = p1.trim().toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[?#&]/g, '');
            let uniqueId = cleanId;
            if (cleanId === '') {
                uniqueId = 'default';
            }
            if (uniqueIdStore[cleanId]) {
                uniqueId = `${cleanId}-${uniqueIdStore[cleanId]}`;
                uniqueIdStore[cleanId] += 1;
            } else {
                uniqueIdStore[cleanId] = 1;
            }
            if (!/<h1 id=".*?">/.test(match)) {
                return `<h1 id="${uniqueId}">${p1}</h1>`;
            }
            return match;
        });
    }
});
