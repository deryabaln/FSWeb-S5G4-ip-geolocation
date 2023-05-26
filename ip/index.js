import axios from 'axios';

var benimIP ;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek
async function getData(){
	await ipAdresimiAl();
	let url = "https://apis.ergineer.com/ipgeoapi/"+benimIP;
	const geoLocation = axios.get(url)
	geoLocation.then(res => {
		console.log(res.data);
		document.querySelector(".cards").append(cardOlustur(res.data))
	})
	.catch(err => {
		console.log("Error", err);
	});
}

getData();

const cardOlustur = ipİnformation => {

const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "card");

const image = document.createElement("img");
image.setAttribute("src","https://flagcdn.com" + "/256x192/" + ipİnformation.ülkeKodu.toLowerCase() + ".png");

const childDiv = document.createElement("div");
childDiv.setAttribute("class", "card-info");

const baslik = document.createElement("h3");
baslik.setAttribute("class", "ip");
baslik.textContent = ipİnformation.sorgu

const p1 = document.createElement("p");
p1.setAttribute("class", "ulke");
p1.textContent = ipİnformation.ülkeKodu

const p2 = document.createElement("p");
p2.textContent = "Enlem: " + ipİnformation.enlem + " Boylam: " + ipİnformation.boylam;

const p3 = document.createElement("p");
p3.textContent = "Şehir: "+ ipİnformation.bölgeAdı;

const p4 = document.createElement("p");
p4.textContent = "Saat Dilimi: " + ipİnformation.saatdilimi;

const p5 = document.createElement("p");
p5.textContent = "Para birimi: " + ipİnformation.parabirimi;

const p6 = document.createElement("p");
p6.textContent = "ISP: "+ ipİnformation.isp;

childDiv.append(baslik, p1, p2, p3, p4, p5, p6)
containerDiv.append(image,childDiv)

	return containerDiv
}

 