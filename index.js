document.addEventListener('DOMContentLoaded', () => {
  // ===== Mostrar mensaje al entrar =====
    const msg = document.createElement('div');
    msg.className = 'panda-message';
    msg.textContent = 'Mi chanchi... presiona el panda🐼';
    document.body.appendChild(msg);

    // Ocultar mensaje después de 4 segundos
    setTimeout(() => {
      msg.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      msg.style.transform = 'translateY(-100%)';
      msg.style.opacity = '0';
      setTimeout(() => msg.remove(), 500);
    }, 4000);

    // ===== Lógica del panda =====
    const panda = document.querySelector('.panda');

    // Lista de GIFs guardados en la carpeta img/
    const gifs = [
      'img/panda1.gif',
      'img/panda2.gif',
      'img/panda3.gif',
      'img/panda4.gif',
      'img/panda5.gif',
      'img/panda6.gif',
      'img/panda7.gif'
    ];

    let indiceInicial = 0;

    // Mostrar el primer GIF
    panda.style.backgroundImage = `url('${gifs[indiceInicial]}')`;

    // Cambiar GIF al hacer clic
    panda.addEventListener('click', () => {
      indiceInicial = (indiceInicial + 1) % gifs.length;
      panda.style.backgroundImage = `url('${gifs[indiceInicial]}')`;
    });
  
    // Funcion para copiar texto
  const paragraphs = document.querySelectorAll('.flow-container p');

  paragraphs.forEach(p => {
    p.style.cursor = 'pointer';

    p.addEventListener('click', () => {
      const textToCopy = p.innerText.trim();
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showCopyMessage(p);
        })
        .catch(err => {
          console.error('Error copiando al portapapeles:', err);
        });
    });
  });

  function showCopyMessage(element) {
    // Crear el div del mensaje
    const msg = document.createElement('div');
    msg.textContent = 'Texto copiado';
    msg.style.position = 'absolute';
    msg.style.backgroundColor = '#4BB543';
    msg.style.color = 'white';
    msg.style.padding = '5px 10px';
    msg.style.borderRadius = '5px';
    msg.style.fontSize = '0.9rem';
    msg.style.fontWeight = 'bold';
    msg.style.pointerEvents = 'none';
    msg.style.zIndex = '1000';
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.3s ease';

    // Añadir al body
    document.body.appendChild(msg);

    // Obtener posición del párrafo para mostrar el mensaje justo arriba
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Posicionar el mensaje centrado horizontalmente sobre el párrafo, un poco arriba
    msg.style.top = (rect.top + scrollTop - msg.offsetHeight - 10) + 'px';
    msg.style.left = (rect.left + scrollLeft + rect.width / 2 - msg.offsetWidth / 2) + 'px';

    // Forzar el repaint para activar la transición
    requestAnimationFrame(() => {
      msg.style.opacity = '1';
    });

    // Luego de 1.2 segundos, desaparecer el mensaje y eliminarlo
    setTimeout(() => {
      msg.style.opacity = '0';
      msg.addEventListener('transitionend', () => {
        msg.remove();
      });
    }, 1200);
  }
});
