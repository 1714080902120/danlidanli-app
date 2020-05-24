document.addEventListener('plusready', () => {})
export async function pay (datas) {
  const AlipayServer = 'http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=0.01';
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status === 200) {
          console.log(datas)
          plus.payment.request(channel, datas, (result) => {
            console.log('支付成功');
            console.log(JSON.stringify(reslut));
          }, err => {
            console.log(err);
            
          })
        } else {
          console.log('失败');
          
        }
        break;
    
      default:
        break;
    }
  }
  xhr.open('GET', AlipayServer)
  xhr.send()
}