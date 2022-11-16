#include <WiFi.h>
#include <WebSocketsClient.h>

// Instancia da biblioteca WebSocketsClient
WebSocketsClient webSocket;

const char *ssid     = "SHARE-RESIDENTE"; //Nome da rede
const char *password = "Share@residente"; //Nome da senha



unsigned long messageInterval = 5000; // Variável que auxilia no intervalo de envio de mensagem do cliente para o servidor
bool connected = false; // Variável de estado para a conexão do Wifi

// Define o serial como uma constante e denominasse a sua função como debug 
#define DEBUG_SERIAL Serial

// Funcao que realiza procedimentos dependendo do estado da comunicação
// O primeiro argumento seria o estado atual da comunicação entre cliente e servidor
// O segundo argumento seria os dados trocados entre ambos, por exemplo, caso houvesse a situação de requisição da mensagem do servidor
// o payload seria a mensagem que o servidor enviou 
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
 
    switch(type) {
      // caso não haja conexão de comunicação haverá um print no Serial
        case WStype_DISCONNECTED:
            DEBUG_SERIAL.printf("[WSc] Disconnected!\n");
            connected = false;
            break;
        case WStype_CONNECTED: {
       // caso haja conexão haverá uma mensagem no Serial indicando o payload "\"
            DEBUG_SERIAL.printf("[WSc] Connected to url: %s\n", payload);
            connected = true;
 
            // send message to server when Connected
            DEBUG_SERIAL.println("[WSc] SENT: Connected");
       // e também haverá o envio de uma mensagem ao servidor dizendo que houve conexão
            webSocket.sendTXT("Connected");
        }
            break;
        case WStype_TEXT:
            DEBUG_SERIAL.printf("[WSc] RESPONSE: %s\n", payload);
            break;
    case WStype_ERROR:
        break;
    }
}


void setup() {
    DEBUG_SERIAL.begin(115200);

// Loop que dá uma visualização do começo de inicialização do setup
    for(uint8_t t = 4; t > 0; t--) {
        DEBUG_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        DEBUG_SERIAL.flush();
        delay(1000);
    }

// Inicializa a conexão por WiFi     
    WiFi.begin(ssid, password);
 
    while ( WiFi.status() != WL_CONNECTED ) {
      delay ( 500 );
      DEBUG_SERIAL.print ( "." );
    }
    DEBUG_SERIAL.print("Local IP: "); DEBUG_SERIAL.println(WiFi.localIP());
    
    // Inicializa a conexão entre cliente e servidor via webSocket 
    // O primeiro argumento é o IP address do webSocketServer
    // O segundo argumento é a porta em que ocorre a comunicação
    // O terceiro é a URL
    webSocket.begin("10.254.18.164", 8080, "/");
 
    // Sempre que houver algum evento observado pelo webSocket.loop() haverá o disparo da função webSocketEvent
    webSocket.onEvent(webSocketEvent);
}

unsigned long lastUpdate = millis();// Variável que grava o momento da última interação entre o servidor e o cliente por mensagens 
 
 
void loop() {
// O loop do webSocket utiliza a função que está no webSocket.onEvent()
// Esse loop checa a comunicação o tempo todo, e quando acontece alguma mudança na comunicação
// por exemplo, quando o cliente envia uma mensagem ao servidor houve então um evento que o webSocket.loop() observou
// Quando há essa observação a função do webSocket.onEvent() é disparada;
      webSocket.loop();

// Se haver comunicação entre o server e o client
// e o tempo da ultima atualização mais um contador de intervalo for menor do que o contador de milissegundos então o Client enviará uma mensagem ao servidor
// Essa condicional em relação ao tempo proporciona de quanto em quanto o cliente irá mandar uma mensagem ao servidor
    if (connected && lastUpdate+messageInterval < millis()){
        DEBUG_SERIAL.println("[WSc] SENT: Simple js client message!!");
        webSocket.sendTXT("[WSc] SENT: Simple js client message!!");
        lastUpdate = millis(); // Atualiza a variável com o momento da última atualização de envio de mensagem
    }
}
