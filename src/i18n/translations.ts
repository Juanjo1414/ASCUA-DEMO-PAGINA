/*
  Textos del sitio. Ascua es una marca inventada: la historia (un solo fuego de
  leña y carbón, la carta leída en grados) es parte del concepto, no un dato de
  un local real.
*/
export const translations = {
  es: {
    error: {
      title: 'Algo salió mal',
      retry: 'Volver a intentar',
    },
    nav: {
      menu: 'Carta',
      contacto: 'Contacto',
      reservar: 'Reservar mesa',
    },
    hero: {
      headline: ['Cocina de autor.', 'Servida con fuego.'],
      cta: 'Reservar mesa',
      ar: 'Mira la carta sobre tu mesa, en RA',
    },

    menuSection: {
      title: 'Ocho platos, una temporada.',
      body: 'El menú cambia con lo que llega fresco al mercado. Estos son los platos que salen del fuego ahora mismo.',
      destacado: 'Míralo sobre tu mesa antes de pedirlo.',
      destacadoBody:
        'Dos platos de la carta se pueden poner sobre tu mesa en realidad aumentada, a tamaño real, desde el navegador del celular. Sin descargar nada.',
      dishes: [
        {
          name: 'Lubina a la plancha',
          description:
            'Puré de arveja, espárragos blancos y ensalada de hinojo con naranja.',
        },
        {
          name: 'Filete a la parrilla',
          description: 'Puré de papa, espárragos y zanahorias baby asadas.',
        },
        {
          name: 'Tagliatelle con hongos',
          description: 'Hongos salteados, parmesano curado y hierbas frescas.',
        },
        {
          name: 'Vieiras sobre risotto',
          description:
            'Risotto cremoso, hierbas de temporada y una copa de vino blanco.',
        },
        {
          name: 'Pechuga de pato',
          description:
            'Puré de nabo, col morada braseada y salsa de frutos rojos.',
        },
        {
          name: 'Gnocchi con trufa',
          description: 'Salvia crujiente, parmesano y láminas de trufa negra.',
        },
        {
          name: 'Langosta con cabello de ángel',
          description: 'Salsa de coco y lima, maní tostado y cilantro fresco.',
        },
        {
          name: 'Lomo de cerdo',
          description: 'Gnocchi dorado, ejotes salteados y almendras tostadas.',
        },
      ],
    },

    ar: {
      view3d: 'Girar en 3D',
      viewAr: 'Ver en RA',
      viewOnTable: 'Ponerlo en mi mesa',
      close: 'Cerrar',
      arUnavailable:
        'Tu dispositivo o navegador no permite abrir la realidad aumentada. Ábrelo desde el celular (Chrome en Android o Safari en iPhone) para verlo sobre tu mesa.',
      inAppTitle: 'Abre esta página en el navegador',
      inAppBody:
        'Estás viendo la carta dentro de {app}, y esos navegadores no pueden abrir la realidad aumentada. Toca el menú de {app} y elige «Abrir en Safari» o «Abrir en Chrome».',
      inAppBodyGeneric:
        'Estás viendo la carta dentro de otra aplicación, y esos navegadores no pueden abrir la realidad aumentada. Ábrela en Safari o Chrome.',
      copyLink: 'Copiar enlace',
      copied: 'Enlace copiado',
      disclaimer: 'Modelo referencial. La presentación puede variar.',
    },
    arGuide: {
      title: '¿Cómo funciona?',
      steps: [
        {
          title: 'Busca un espacio iluminado',
          desc: 'Evita sombras muy oscuras para que la cámara vea bien tu mesa.',
        },
        {
          title: 'Apunta a una superficie plana',
          desc: 'Busca un lugar despejado en la mesa.',
        },
        {
          title: 'Mueve el celular despacio',
          desc: 'Haz círculos pequeños hasta que aparezca el plato.',
        },
      ],
      gotIt: 'Entendido, abrir cámara',
    },
    cta: {
      title: 'Tu mesa te espera.',
      body: 'Abrimos de martes a domingo, desde las 7 p.m. Reserva con un día de anticipación.',
      button: 'Reservar mesa',
    },
    contact: {
      title: 'Escríbenos.',
      body: 'Resuelve dudas, pide reservas para grupos grandes o cuéntanos qué celebras.',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tucorreo@ejemplo.com',
      messagePlaceholder: '¿En qué te ayudamos?',
      reservaPrefill:
        'Quiero reservar una mesa para __ personas el __ a las __.',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Mensaje enviado. Te responderemos pronto.',
      error: 'Revisa los campos marcados antes de enviar.',
      errors: {
        name: 'Escribe tu nombre.',
        email: 'Escribe un correo válido.',
        message: 'Cuéntanos algo (mínimo 10 caracteres).',
      },
      addressTitle: 'Dirección',
      hoursTitle: 'Horario',
      hours: 'Martes a domingo, 7 p.m. – 11 p.m.',
      hoursCorto: 'Mar a dom · 7 p.m.',
    },
    footer: {
      tagline: 'Cocina de autor, servida con fuego.',
      rights: 'Todos los derechos reservados.',
      feedback: 'Danos tu opinión',
      privacy:
        'Aviso de privacidad: No usamos cookies de rastreo ni guardamos datos personales.',
      madeBy: 'Hecho por PITS · Ascua',
    },
    backToTop: 'Volver arriba',
  },
  en: {
    error: {
      title: 'Something went wrong',
      retry: 'Try again',
    },
    nav: {
      menu: 'Menu',
      contacto: 'Contact',
      reservar: 'Book a table',
    },
    hero: {
      headline: ['Chef-driven cooking.', 'Served with fire.'],
      cta: 'Book a table',
      ar: 'See the menu on your table, in AR',
    },

    menuSection: {
      title: 'Eight dishes, one season.',
      body: 'The menu changes with what comes fresh from the market. These are the dishes leaving the fire right now.',
      destacado: 'See it on your table before you order.',
      destacadoBody:
        'Two dishes on the menu can be placed on your table in augmented reality, at real size, from your phone’s browser. Nothing to download.',
      dishes: [
        {
          name: 'Pan-seared sea bass',
          description: 'Pea purée, white asparagus and fennel-orange salad.',
        },
        {
          name: 'Grilled steak',
          description: 'Potato purée, roasted asparagus and baby carrots.',
        },
        {
          name: 'Mushroom tagliatelle',
          description: 'Sautéed mushrooms, aged parmesan and fresh herbs.',
        },
        {
          name: 'Scallops over risotto',
          description:
            'Creamy risotto, seasonal herbs and a glass of white wine.',
        },
        {
          name: 'Duck breast',
          description: 'Turnip purée, braised red cabbage and red berry sauce.',
        },
        {
          name: 'Truffle gnocchi',
          description: 'Crispy sage, parmesan and shaved black truffle.',
        },
        {
          name: 'Lobster with angel hair',
          description:
            'Coconut-lime sauce, toasted peanuts and fresh cilantro.',
        },
        {
          name: 'Pork loin',
          description:
            'Golden gnocchi, sautéed green beans and toasted almonds.',
        },
      ],
    },

    ar: {
      view3d: 'Turn in 3D',
      viewAr: 'View in AR',
      viewOnTable: 'Place it on my table',
      close: 'Close',
      arUnavailable:
        'Your device or browser can’t open augmented reality. Open this page on your phone (Chrome on Android or Safari on iPhone) to place it on your table.',
      inAppTitle: 'Open this page in your browser',
      inAppBody:
        'You are viewing the menu inside {app}, and those browsers cannot open augmented reality. Tap the {app} menu and choose “Open in Safari” or “Open in Chrome”.',
      inAppBodyGeneric:
        'You are viewing the menu inside another app, and those browsers cannot open augmented reality. Open it in Safari or Chrome.',
      copyLink: 'Copy link',
      copied: 'Link copied',
      disclaimer: 'Reference model. The real plating may vary.',
    },
    arGuide: {
      title: 'How it works',
      steps: [
        {
          title: 'Find a well-lit space',
          desc: 'Avoid harsh shadows so the camera can see your table clearly.',
        },
        {
          title: 'Point at a flat surface',
          desc: 'Find an empty spot on the table.',
        },
        {
          title: 'Move your phone slowly',
          desc: 'Make small circles until the dish appears.',
        },
      ],
      gotIt: 'Got it, open camera',
    },
    cta: {
      title: 'Your table is waiting.',
      body: 'Open Tuesday to Sunday, from 7 p.m. Book at least a day ahead.',
      button: 'Book a table',
    },
    contact: {
      title: 'Write to us.',
      body: 'Ask questions, book for large groups, or tell us what you’re celebrating.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'How can we help?',
      reservaPrefill: 'I’d like to book a table for __ people on __ at __.',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Message sent. We’ll get back to you soon.',
      error: 'Check the marked fields before sending.',
      errors: {
        name: 'Enter your name.',
        email: 'Enter a valid email.',
        message: 'Tell us something (10 characters minimum).',
      },
      addressTitle: 'Address',
      hoursTitle: 'Hours',
      hours: 'Tuesday to Sunday, 7 p.m. – 11 p.m.',
      hoursCorto: 'Tue–Sun · 7 p.m.',
    },
    footer: {
      tagline: 'Chef-driven cooking, served with fire.',
      rights: 'All rights reserved.',
      feedback: 'Give us your feedback',
      privacy:
        'Privacy notice: We do not use tracking cookies or store personal data.',
      madeBy: 'Made by PITS · Ascua',
    },
    backToTop: 'Back to top',
  },
}
