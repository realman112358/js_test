/**
 * Created by wg on 14/10/24.
 */

var sleep = require('sleep');
var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

driver.get('http://www.baidu.com');
console.log(driver.findElements(webdriver.By.name('img')).getAttrib('src'));
/*driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
driver.findElement(webdriver.By.name('btnG')).click();
driver.wait(function() {
    return driver.getTitle().then(function(title) {
        return title === 'webdriver - Google Search';
    });
}, 1000);

*/
driver.quit();
