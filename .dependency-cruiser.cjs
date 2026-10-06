/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-is-pure',
      comment: 'La capa de dominio no puede importar de ninguna otra capa ni frameworks como React.',
      severity: 'error',
      from: {
        path: '^src/domain/'
      },
      to: {
        path: '^src/(application|infrastructure|presentation|app|shared)/|react'
      }
    },
    {
      name: 'application-only-depends-on-domain-and-shared',
      comment: 'La capa de aplicación solo depende del dominio y utils compartidos.',
      severity: 'error',
      from: {
        path: '^src/application/'
      },
      to: {
        path: '^src/(infrastructure|presentation|app)/'
      }
    },
    {
      name: 'infrastructure-depends-on-application-and-domain',
      comment: 'La capa de infraestructura implementa puertos de aplicación.',
      severity: 'error',
      from: {
        path: '^src/infrastructure/'
      },
      to: {
        path: '^src/(presentation|app)/'
      }
    },
    {
      name: 'presentation-depends-on-application-and-domain',
      comment: 'La capa de presentación NO puede importar infraestructura directamente.',
      severity: 'error',
      from: {
        path: '^src/presentation/'
      },
      to: {
        path: '^src/infrastructure/'
      }
    },
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'This dependency is part of a circular relationship.',
      from: {},
      to: {
        circular: true
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    includeOnly: '^src',
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json'
    }
  }
};
