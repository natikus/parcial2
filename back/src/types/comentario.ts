import { Static, Type } from "@sinclair/typebox";
export const SchemaIdComentario = Type.Object({
  IdComentario: Type.Integer({
    description: "Identificador único del comentario",
  }),
  IdTarea: Type.Integer({
    description: "Identificador único dela tarea",
  }),
});
export type SchemaIdComentarioType = Static<typeof SchemaIdComentario>;

export const SchemaComentario = Type.Object(
  {
    id_tema: Type.Integer(),
    id_comentario: Type.Integer(),
    id_usuario: Type.Integer(),
    titulo: Type.String({
      maxLength: 100,
      description: "Titulo del comentario",
    }),
    descripcion: Type.String({ description: "Nombre del comentario" }),
  },
  {
    examples: [
      {
        titulo: "comentario de prueba 1",
        descripcion: "La descripcion del comentario de prueba 1",
      },
      {
        titulo: "comentario de prueba 2",
        descripcion: "La descripcion del comentario de prueba 2",
      },
    ],
  }
);
export type SchemaComentarioType = Static<typeof SchemaComentario>;

export const SchemaPostComentario = Type.Object(
  {
    id_tema: Type.Integer(),
    id_usuario: Type.Integer(),
    titulo: Type.String({
      maxLength: 100,
      description: "Titulo del comentario",
    }),
    descripcion: Type.String({ description: "Descripcion del comentario" }),
  },
  {
    examples: [
      {
        titulo: "comentario de prueba 1",
        descripcion: "La descripcion del comentario de prueba 1",
      },
      {
        titulo: "comentario de prueba 2",
        descripcion: "La descripcion del comentario de prueba 2",
      },
    ],
  }
);
export type SchemaPostComentarioType = Static<typeof SchemaPostComentario>;

export const SchemaComentarioPut = Type.Object(
  {
    titulo: Type.Optional(
      Type.String({
        maxLength: 100,
        description: "Nuevo titulo del comentario",
      })
    ),
    descripcion: Type.Optional(
      Type.String({
        description: "Nueva descripcion del comentario",
      })
    ),
  },
  {
    examples: [
      {
        titulo: "comentario de prueba 1",
        descripcion: "La descripcion del comentario de prueba 1",
      },
      {
        titulo: "comentario de prueba 2",
        descripcion: "La descripcion del comentario de prueba 2",
      },
    ],
  }
);
export type SchemaComentarioPutType = Static<typeof SchemaComentarioPut>;
