
# include <WiFi.h>

// Variáveis que serão utilizadas para a conexão, ou seja, o nome da rede e da senha
const char* ssid = "Inteli-COLLEGE";
const char* password = "QazWsx@123";

//Função responsável por saber o status do Wifi e dar um sinal de conexão via led interno verde se haver conexão
void connectionWifi () {
// Se o wifi se conectar o led verde se acende
    if ((WiFi.status()== WL_CONNECTED)){
    Serial.println(WiFi.status());
    neopixelWrite(RGB_BUILTIN,0,RGB_BRIGHTNESS,0); // led verde interno
    delay(6000);
   }
  } 

void setup() {
  // Quando se inicializa o ESP-32 ele vai estar em processo de conexão
  // já que vai estar em processo de conexão então o led vermelho irá se acender
  neopixelWrite(RGB_BUILTIN,RGB_BRIGHTNESS,0,0); // led vermelho interno
  Serial.begin(115200);
  // Inicializa o wifi
    WiFi.begin(ssid, password);
}

void loop() {
   connectionWifi();   
}

// Documentação dos testes:
// A saída esperada é se conectar ao Wifi o led verde se acende
// O experimento obteve a resposta esperada
