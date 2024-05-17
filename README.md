# SHOPPING APP FRONTED

 


[![Download IntelliJ IDEA](https://img.shields.io/badge/download-IntelliJ%20IDEA-blue)](https://www.jetbrains.com/idea/download/)
[![React](https://img.shields.io/badge/React-^17.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-^14.0.0-green)](https://nodejs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-^2.5.0-brightgreen)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-^3.8.1-yellow)](https://maven.apache.org/)
[![HTML](https://img.shields.io/badge/HTML-5-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-3-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Java](https://img.shields.io/badge/Java-^11.0-orange)](https://www.java.com/)


<p align="center">
    <a href="https://www.youtube.com/watch?v=OknDmeu9GZs">
  <img src="https://github.com/Bhanover/ShoppingAppFrontend/assets/127310131/12f91de9-c497-4bc4-890d-7de6933fd7ff" alt="logo" width="300">
    </a>
</p>


## Descripción
Store es una página enfocada en la venta de ropa. Se busca proporcionar una experiencia de compra segura, eficiente y visualmente atractiva, permitiendo a los usuarios explorar y
adquirir productos desde cualquier dispositivo

## Características Principales

### Para Usuarios
- **Navegación de Productos**:
  - Explora ropa y accesorios por categorías y subcategorías.
  - Visualiza detalles, descripciones, precios y tamaños.

- **Cuenta de Usuario**:
  - Regístrate e inicia sesión para una experiencia personalizada.

- **Carrito de Compras**:
  - Añade productos al carrito y gestiona tu compra fácilmente.

- **Página de Contacto**:
  - Rellena un formulario o envía un mensaje a través de WhatsApp.

### Para Administradores
- **Gestión de Productos**:
  - Crea, edita y elimina productos.

- **Gestión de Categorías**:
  - Crea, edita y elimina categorías y subcategorías.

- **Panel de Administración**:
  - Administra la tienda desde un panel centralizado.

### Adaptabilidad y Seguridad
- **Adaptabilidad a Dispositivos Móviles**:
  - Experiencia optimizada en dispositivos móviles y de escritorio.

- **Plataforma Segura**:
  - Navega y compra con confianza en una plataforma segura.

## Bibliotecas y Dependencias

### Cliente (usando React+Vite):
- react-router-dom: Maneja la navegación y el enrutamiento en la aplicación React.
- axios: Realiza solicitudes HTTP desde el cliente React al servidor.
- sockjs-client, stompjs: Proporcionan funcionalidad de WebSocket en el cliente.
- react-dropzone: Permite la carga de archivos mediante arrastrar y soltar.
- @emoji-mart/react, @emoji-mart/data: Proporcionan un selector de emojis en la aplicación.
- react-responsive-carousel: Ofrece un carrusel responsivo en la aplicación.
- @fortawesome/react-fontawesome, @fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, font-awesome, @fortawesome/fontawesome-free: Incluye iconos y símbolos en la interfaz de usuario.
- react-intersection-observer: Detecta cuando un elemento está en el punto de vista del viewport para cargar contenido perezosamente o habilitar el scroll infinito.

Estas bibliotecas y dependencias han sido seleccionadas por su robustez, confiabilidad y compatibilidad, brindando una base sólida para el desarrollo y mantenimiento continuo del proyecto.

## Requisitos del Sistema
Para ejecutar este proyecto, necesitarás lo siguiente instalado en tu sistema:
- Node.js v14 o superior
- Git
- Un IDE adecuado como Visual Studio Code para React.


### Instalación y Configuración del entorno de desarrollo

#### Visual Studio Code
1. Descarga e instala [Visual Studio Code](https://code.visualstudio.com/download).
2. Abre Visual Studio Code y selecciona "Open Folder" desde el menú "File". Busca y selecciona la carpeta del cliente dentro del proyecto que clonaste.
3. Ejecuta `npm install` en la terminal de Visual Studio Code para instalar las dependencias necesarias del cliente.

 
## Cómo Empezar
Después de configurar el entorno de desarrollo el cliente de la siguiente manera:

### Cliente (React)
1. Abre Visual Studio Code y navega a la terminal integrada.
2. Asegúrate de que estás en la carpeta del cliente `/shoppinappfronted` y ejecuta `npm install` en la terminal para actualizar las dependecias alojadas en el proyecto.
3. A continuación añade `npm run dev` esto iniciará el cliente, y generalmente se abrirá automáticamente en una nueva pestaña de tu navegador.

![image](https://github.com/Bhanover/ShoppingAppFrontend/assets/127310131/3445d1d3-9fba-4750-85f2-36065b33ca94)


Una vez que el servidor y el cliente estén funcionando, puedes interactuar con la aplicación a través de tu navegador.

## Guía de Uso Detallada

### Para Usuarios

#### Navegación y Exploración de Productos
1. **Inicio**:
   - Accede a la página de inicio para ver las últimas tendencias y productos destacados.
2. **Categorías y Subcategorías**:
   - Utiliza el menú de navegación para explorar productos por categorías y subcategorías.
3. **Detalles del Producto**:
   - Haz clic en cualquier producto para ver detalles completos, incluyendo descripción, precio y opciones de tamaño.

#### Registro e Inicio de Sesión
1. **Registro**:
   - Haz clic en "Registrarse" en la esquina superior derecha.
   - Completa el formulario de registro con tu información personal y crea una cuenta.
2. **Inicio de Sesión**:
   - Si ya tienes una cuenta, haz clic en "Iniciar Sesión" e ingresa tus credenciales.

#### Carrito de Compras
1. **Añadir al Carrito**:
   - Selecciona el tamaño y otras opciones del producto.
   - Haz clic en "Añadir al Carrito".
2. **Revisar Carrito**:
   - Haz clic en el ícono del carrito para revisar los productos añadidos.
   - Modifica las cantidades o elimina productos según sea necesario.
3. **Proceder al Pago**:
   - Una vez satisfecho con tu selección, haz clic en "Proceder al Pago" para completar tu compra.

#### Página de Contacto
1. **Formulario de Contacto**:
   - Accede a la página de contacto desde el menú principal.
   - Completa el formulario con tu consulta o mensaje.
2. **WhatsApp**:
   - Alternativamente, envía un mensaje directo a través de WhatsApp para soporte rápido.

### Para Administradores

#### Gestión de Productos
1. **Crear Producto**:
   - Accede al panel de administración y selecciona "Productos".
   - Haz clic en "Crear Nuevo Producto".
   - Completa los campos obligatorios como nombre, descripción, precio e imágenes.
   - Selecciona la categoría y subcategoría correspondiente.
   - Guarda el producto.
2. **Editar Producto**:
   - En la lista de productos, selecciona el producto a editar.
   - Haz los cambios necesarios y guarda.
3. **Eliminar Producto**:
   - En la lista de productos, selecciona el producto a eliminar.
   - Confirma la eliminación.

#### Gestión de Categorías y Subcategorías
1. **Crear Categoría/Subcategoría**:
   - Accede al panel de administración y selecciona "Categorías".
   - Haz clic en "Crear Nueva Categoría" o "Crear Nueva Subcategoría".
   - Completa los campos necesarios y guarda.
2. **Editar Categoría/Subcategoría**:
   - En la lista de categorías, selecciona la categoría o subcategoría a editar.
   - Haz los cambios necesarios y guarda.
3. **Eliminar Categoría/Subcategoría**:
   - En la lista de categorías, selecciona la categoría o subcategoría a eliminar.
   - Confirma la eliminación.

#### Panel de Administración
1. **Acceso**:
   - Inicia sesión con tus credenciales de administrador.
2. **Dashboard**:
   - Desde el dashboard, accede a la gestión de productos, categorías, pedidos y usuarios.
3. **Actualización de Información**:
   - Mantén la tienda actualizada con las últimas novedades y cambios de productos.

### Adaptabilidad y Seguridad
1. **Adaptabilidad a Dispositivos Móviles**:
   - La tienda está diseñada para ser completamente adaptable, permitiendo una experiencia óptima en móviles, tablets y escritorios.
2. **Seguridad**:
   - Asegúrate de que la conexión sea segura (HTTPS) para proteger la información personal y de pago de los usuarios.

## Información Importante

- **Subida de imágenes:** Es importante notar que solo se pueden subir imágenes con un tamaño máximo de 10MB debido a las restricciones de Cloudinary, que es el servicio que utilizamos para almacenar este tipo de archivos. Esto se debe a que estamos utilizando la versión gratuita de Cloudinary, que tiene un límite de tamaño de archivo.
- **Conexión con la base de datos:** Es importante saber que tienes que tener bien conectado la base de datos con spring boot en el caso de que no lo este te saldra este error:

![image](https://github.com/Bhanover/MyProject/assets/127310131/1c082f26-aadb-4338-9905-e57984bf196e)

Una posible solución es que si hiciste todos los pasos bien , ademas de eso tienes que tener el programa de Mysql abierto.


- **Activar Lombook:** En Spring Boot al iniciar el proyecto por primera vez , Spring Boot te pedira que actives la Lombook y en ese caso das click a `enabled lombook`


 ## Cómo Contribuir
Las contribuciones son bienvenidas y apreciadas. Sigue estos pasos para contribuir:
1. Haz un "Fork" del repositorio.
2. Clona el fork a tu máquina local.
3. Crea una nueva rama para tu cambio.
4. Haz tus cambios y asegúrate de probarlos.
5. Haz un "commit" de tus cambios a tu rama.
6. Haz un "push" de tus cambios a tu fork en GitHub.
7. Abre un "Pull Request" en el repositorio original.

Por favor, asegúrate de que tu código sigue las convenciones de estilo del proyecto y que has añadido pruebas para cualquier cambio que hagas, si es aplicable.


## Contacto
Si tienes preguntas o deseas discutir algo sobre el proyecto, no dudes en contactarme a través de mi correo electrónico: billydht5@gmail.com

## Licencia
Este proyecto está licenciado bajo [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
