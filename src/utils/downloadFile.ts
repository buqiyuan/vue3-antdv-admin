/**
 * 根据文件地址下载文件
 * @param {*} sUrl
 */
export function downloadByUrl({
                                  url,
                                  target = '_blank',
                                  fileName,
                              }: {
    url: string;
    target?: '_self' | '_blank';
    fileName?: string;
}): boolean {
    const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    if (/(iP)/g.test(window.navigator.userAgent)) {
        console.error('您的浏览器不支持下载!');
        return false;
    }
    if (isChrome || isSafari) {
        const link = document.createElement('a');
        link.href = url;
        link.target = target;

        if (link.download !== undefined) {
            link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
        }

        if (document.createEvent) {
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }

    window.open(url, target);
    return true;
}
