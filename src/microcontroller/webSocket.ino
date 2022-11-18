#include <WiFi.h>
#include <WebSocketsClient.h>

// Instancia da biblioteca WebSocketsClient
WebSocketsClient webSocket;

const char *ssid     = "SHARE-RESIDENTE"; //Nome da rede local
const char *password = "Share@residente"; //Nome da senha local

unsigned long messageInterval = 5000; // Variável que auxilia no intervalo de envio de mensagem do cliente para o servidor
bool connected = false; // Variável de estado para a conexão do Wifi
int ftmResposta;

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
            auxiliar = true;
 
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

const char * WIFI_FTM_SSID = "WiFi_FTM_Responder"; // Nome da rede do acess point
const char * WIFI_FTM_PASS = "ftm_responder"; // Senha do acess point

// FTM configurações

const uint8_t FTM_FRAME_COUNT = 16;
const uint16_t FTM_BURST_PERIOD = 2;

// Semaphore usado para quando houver o report do FTM recebido
xSemaphoreHandle ftmSemaphore;
// Status do recebimento do FTM report
bool ftmSuccess = true;

// Evento do FTM que será disparado quando houver a requisição positiva do report
void onFtmReport(arduino_event_t *event) {
  const char * status_str[5] = {"SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL"};
  wifi_event_ftm_report_t * report = &event->event_info.wifi_ftm_report;
  // Quando o resultado do report for um sucesso haverá uma mudança do status do FTM
  ftmSuccess = report->status == FTM_STATUS_SUCCESS;
  if (ftmSuccess) {
    // Print da estimativa da distância
    Serial.printf("FTM Estimate: Distance: %.2f m, Return Time: %u ns\n", ((float)report->dist_est / 100.0) - 40, report->rtt_est);
    ftmResposta = ((float)report->dist_est / 100.0) - 40; // Armazenamento da distância em uma variável para ser usado depois
    // Após o uso os dados do report tem que estar livres
    free(report->ftm_report_data);
  } else {
    Serial.print("FTM Error: ");
    Serial.println(status_str[report->status]);
  }
  // Sinal do report é recebido
  xSemaphoreGive(ftmSemaphore);
}

// Inicialização da sessão do FTM e requisição do FTM report 
bool getFtmReport(){
  if(!WiFi.initiateFTM(FTM_FRAME_COUNT, FTM_BURST_PERIOD)){
    Serial.println("FTM Error: Initiate Session Failed");
    return false;
  }
  // Espera pelo sinal quando houver o report e se for positivo retorna um valor booleano "true"
  return xSemaphoreTake(ftmSemaphore, portMAX_DELAY) == pdPASS && ftmSuccess;
}

void connectWifiResponder () {
  ftmSemaphore = xSemaphoreCreateBinary();
  
  // Connect to AP that has FTM Enabled
  Serial.println("Connecting to FTM Responder");
  WiFi.begin(WIFI_FTM_SSID, WIFI_FTM_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi Connected");

  Serial.print("Initiating FTM session with Frame Count ");
  Serial.print(FTM_FRAME_COUNT);
  Serial.print(" and Burst Period ");
  Serial.print(FTM_BURST_PERIOD * 100);
  Serial.println(" ms");

  // Event handler que dispara a função onFtmReport 
  WiFi.onEvent(onFtmReport, ARDUINO_EVENT_WIFI_FTM_REPORT);
  }


// Função que se conecta com a rede local 
void restartLocalWifi() {
  
// Inicializa a conexão por WiFi     
    WiFi.begin(ssid, password);
 
    while ( WiFi.status() != WL_CONNECTED ) {
      delay ( 500 );
      DEBUG_SERIAL.println( "Não conecta" );
    }

    DEBUG_SERIAL.println("Conecta");
    
    // Inicializa a conexão entre cliente e servidor via webSocket 
    // O primeiro argumento é o IP address do webSocketServer
    // O segundo argumento é a porta em que ocorre a comunicação
    // O terceiro é a URL
    webSocket.begin("10.254.17.132", 8080, "/");
 
    // Sempre que houver algum evento observado pelo webSocket.loop() haverá o disparo da função webSocketEvent
    webSocket.onEvent(webSocketEvent);

  }

void setup() {
    DEBUG_SERIAL.begin(115200);

// Loop que dá uma visualização do começo de inicialização do setup
    for(uint8_t t = 4; t > 0; t--) {
        DEBUG_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        DEBUG_SERIAL.flush();
        delay(1000);
    }

connectWifiResponder();

}

unsigned long lastUpdate = millis();// Variável que grava o momento da última interação entre o servidor e o cliente por mensagens 
 
 
void loop() {

if (!contador) {
  getFtmReport();
}

  WiFi.disconnect();


 restartLocalWifi();

 // O loop do webSocket utiliza a função que está no webSocket.onEvent()
// Esse loop checa a comunicação o tempo todo, e quando acontece alguma mudança na comunicação
// por exemplo, quando o cliente envia uma mensagem ao servidor houve então um evento que o webSocket.loop() observou
// Quando há essa observação a função do webSocket.onEvent() é disparada;
while (!connected) {
      webSocket.loop();
}

// Se haver comunicação entre o server e o client
// e o tempo da ultima atualização mais um contador de intervalo for menor do que o contador de milissegundos então o Client enviará uma mensagem ao servidor
// Essa condicional em relação ao tempo proporciona de quanto em quanto o cliente irá mandar uma mensagem ao servidor
    if (connected && lastUpdate+messageInterval < millis()){
        DEBUG_SERIAL.println("[WSc] SENT: Simple js client message!!");
        webSocket.sendTXT("[WSc] SENT: Simple js client message!!");
        WiFi.disconnect();
        connectWifiResponder();
        connected = false;
        getFtmReport();
        lastUpdate = millis(); // Atualiza a variável com o momento da última atualização de envio de mensagem
    }
}
