import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.socketUrl = "https://socket-drivers-production.up.railway.app";
    this.listeners = {};
    this.connectionPromise = null;
  }

  connect() {
    // Si ya existe una promesa de conexión pendiente, devolver esa
    if (this.connectionPromise) {
      return this.connectionPromise;
    }
    
    // Si el socket ya está conectado, devolver una promesa resuelta
    if (this.socket && this.socket.connected) {
      return Promise.resolve(true);
    }
    
    console.log("Connecting to socket server:", this.socketUrl);
    
    // Crear una nueva promesa de conexión
    this.connectionPromise = new Promise((resolve, reject) => {
      // Establecer un timeout por si la conexión no se establece
      const timeoutId = setTimeout(() => {
        reject(new Error("Socket connection timeout"));
      }, 10000); // 10 segundos de timeout
      
      this.socket = io(this.socketUrl, {
        transports: ["websocket"],
        autoConnect: true,
      });

      this.socket.on("connect", (data) => {
        console.log("Socket connected successfully", data);
        clearTimeout(timeoutId);
        this.connectionPromise = null;
        resolve(true);
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        clearTimeout(timeoutId);
        this.connectionPromise = null;
        reject(error);
      });

      this.socket.on("disconnect", (data) => {
        console.log("Socket disconnected", data);
      });

      this.socket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      // Debug listener for all events
      this.socket.onAny((event, ...args) => {
        console.log(`Socket received event: ${event}`, args);
      });
    });
    
    // Una vez conectado, configurar los listeners almacenados
    this.connectionPromise
      .then(() => {
        this.setupStoredListeners();
      })
      .catch((error) => {
        console.error("Failed to connect to socket server:", error);
      });
    
    return this.connectionPromise;
  }

  disconnect() {
    if (this.socket) {
      Object.keys(this.listeners).forEach(event => {
        this.socket.off(event);
      });
      this.listeners = {};
      this.socket.disconnect();
      this.socket = null;
      this.connectionPromise = null;
      console.log("Socket disconnected and cleaned up");
    }
  }

  setupStoredListeners() {
    if (!this.socket) return;
    
    Object.entries(this.listeners).forEach(([event, callbacks]) => {
      callbacks.forEach(callback => {
        this.socket.on(event, callback);
      });
    });
  }

  on(event, callback) {
    // Registrar el callback en los listeners
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    // Wrap callback with error handling and logging
    const wrappedCallback = (...args) => {
      // console.log(`Socket received ${event} event:`, args);
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in ${event} event handler:`, error);
      }
    };
    
    this.listeners[event].push(wrappedCallback);

    // Conectar el socket si no está conectado
    if (!this.socket) {
      console.log(`Socket not connected, connecting before adding listener for: ${event}`);
      this.connect().catch(error => {
        console.error(`Failed to connect socket for ${event}:`, error);
      });
    } else {
      // Registrar en el socket si existe
      console.log(`Registering listener for event: ${event}`);
      this.socket.on(event, wrappedCallback);
    }

    // Devolver una función para eliminar este listener específico
    return () => this.off(event, wrappedCallback);
  }

  off(event, callback) {
    if (!this.socket) {
      console.warn(`Cannot remove listener for ${event}, socket not connected`);
      return;
    }

    // Eliminar del registro de listeners
    if (this.listeners[event]) {
      console.log(`Removing listener for event: ${event}`);
      this.listeners[event] = this.listeners[event].filter(
        cb => cb !== callback
      );
      if (this.listeners[event].length === 0) {
        delete this.listeners[event];
        console.log(`No more listeners for event: ${event}`);
      }
    }

    // Eliminar del socket
    this.socket.off(event, callback);
  }

  async emit(event, data) {
    try {
      // Asegurarse de que el socket esté conectado antes de emitir
      if (!this.socket || !this.socket.connected) {
        await this.connect();
      }
      
      // Ahora emitir el evento
      this.socket.emit(event, data);
      console.log(`Emitted event: ${event}`, data);
    } catch (error) {
      console.error(`Failed to emit ${event}:`, error);
      throw error;
    }
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

// Exportar una instancia única para uso en toda la app
export const socketService = new SocketService(); 