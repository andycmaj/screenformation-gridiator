"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Viewer",
    embedded: false
  },
  {
    name: "Pane",
    embedded: false
  },
  {
    name: "Content",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/andycunn/screenformation-gridiator/dev`
});
exports.prisma = new exports.Prisma();
