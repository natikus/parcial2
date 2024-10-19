import { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../../../services/comentarios.js";
import { IdTema } from "../../../../types/tema.js";
import {
  SchemaComentario,
  SchemaComentarioPut,
  SchemaComentarioType,
  SchemaIdComentario,
  //SchemaIdComentarioType,
  SchemaPostComentario,
  SchemaPostComentarioType,
} from "../../../../types/comentario.js";
const comentariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Obtener un comentaio especifico",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - response. \n - Solo admin tiene permisos.",
      tags: ["comentaio"],
      params: IdTema,
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_tema } = request.params as IdTema;
      return comentarioService.findAll(id_tema);
    },
  });
  fastify.post("/", {
    schema: {
      summary: "Crear un comentaio ",
      params: SchemaPostComentario,
      tags: ["comentaio"],
      description: "Crea una nueva persona",
    },
    preHandler: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const comentaioPost = request.body as SchemaPostComentarioType;
      comentarioService.create(
        comentaioPost.id_tema,
        comentaioPost.id_usuario,
        comentaioPost.descripcion,
        comentaioPost.titulo
      );
    },
  });
  fastify.put("/", {
    schema: {
      tags: ["comentaio"],
      summary: "Actualizar comentaio.",
      description: "actualiza un comentario",

      body: SchemaComentario,
      params: SchemaIdComentario,
      response: {
        200: {
          description: "Comentario actualizado.",
          content: {
            "application/json": {
              schema: SchemaComentarioPut,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    preHandler: [fastify.verifyParamsInBody],
    handler: async function (request, reply) {
      const comentario = request.body as SchemaComentarioType;
      return comentarioService.modify(
        comentario.id_tema,
        comentario.id_comentario,
        comentario.descripcion,
        comentario.titulo
      );
    },
  });
  /*fastify.delete("/id_comentario", {
    schema: {
      tags: ["usuarios"],
      params: SchemaIdComentario,
      summary: "Borrar comentario por id",
      description: "borrar un comentario",
      response: {
        204: {
          description: "No content",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const { IdComentario } = request.params as SchemaIdComentarioType;
      reply.code(204);
      return comentarioService.erase(IdComentario);
    },
  });*/
};

export default comentariosRoutes;
