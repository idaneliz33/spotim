
//Spot.IM job interview exercise - Idan Elitzur

//node packages
const webdriver = require('selenium-webdriver');
const chrome = require('chromedriver');
const chai = require('chai');


//conf
let element_time = 10000;

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(/* ... */)
    .build();

//classes
const actionSequence = webdriver.ActionSequence;
const key = webdriver.Key;
const By = webdriver.By;
const until = webdriver.until;
const expect = chai.expect;


//test cases
describe("Spot.IM - Job interview exricse", async function(){

	this.timeout(30000);

	before(function(){
		driver.manage().window().maximize();
	});

	it("Step 1 - Heading to rm.com", async function(){
		try {
			await driver.get('https://www.rt.com');
			return driver.findElement(By.css('div.columns.columns_margin_main-top'));
  		} finally {
  		    return null;
  	    }		
	});

	it("Step 2 - Heading into the main article", async function(){
		try {
			await driver.findElement(By.css('a.main-promobox__link')).click();
  		} finally {
  		    return null;
  	    }		
	});

	it("Step 3 - Switching to Spot.IM iFrame and publishing the content", async function(){
		try {
		    let element = await driver.findElement(By.css('div.spot-im-conversation-module.sppre_conversation-module'));
		    await driver.executeScript("arguments[0].scrollIntoView();", element).then(async function(){
				await driver.sleep(1000);
		    });
			await driver.switchTo().frame(driver.findElement(By.css("div.sppre_frame-container>iframe"))).then(async function(){
				let userName = await driver.findElement(By.xpath('//*[@id=\"root\"]/div/div[2]/div[2]/div[2]/div[1]/div[1]/input'));
	            let txtEditor =  await driver.findElement(By.className("ql-editor"));
	            let by = await By.css('button.sppre_send-button.brand-bg-color.brand-bg-color-hover');
				await userName.click();
				await userName.sendKeys("Idan");
				await driver.sleep(2000);
			    await txtEditor.sendKeys('Bla.. Bla.. Bla..');
			    await driver.sleep(2000);
				await driver.wait(until.elementLocated(by, 10000));
				let el = driver.findElement(by);
				await driver.wait(until.elementIsVisible(el), 10000);
			})
		} finally {
  		    return null;
  	    }	
	});

	it("Step 4 - Published comment verification", async function(){
		try {
			await driver.findElement(By.css('button.sppre_send-button.brand-bg-color.brand-bg-color-hover')).click().then(async function(){
				await driver.executeScript('scroll(0, 1000);').then(async function() {
	   	 			await driver.sleep(3000);
	   	 			let publishedComment = await driver.findElement(By.xpath('//*[@id=\"root\"]/div/div[2]/ul/li[2]/div/div/div[1]/div[2]/div/div[2]/div[3]/div'));
					await publishedComment.getText().then(function (text) {
					   console.log('Published comment data: ' + text);
					   expect(text.to.equal('Bla.. Bla.. Bla..'));
					});
				});
			});
  		} finally {
  		    return null;
  	    }		
	});

	it("Step 5 - Fetching published comment ID", async function(){
		try {
 		    let dataMsgId = await driver.findElement(By.css('div.sppre_message-view.sppre_depth-0.sppre_conversation-message'));
		    await dataMsgId.getAttribute('data-message-id').then(async function (id) {
		    	await console.log('Published comment ID: ' + id);
			});
  		} finally {
  		    return null;
  	    }		
	});


})