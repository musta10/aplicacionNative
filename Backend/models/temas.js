// 'use strict'

// var mongoose = require('mongoose')
// var Schema = mongoose.Schema;

// // MODELO COMMENTARIOS
// var CommentSchema = Schema({
//     content: String,
//     date: { type: Date, default: Date.now},
//     user: {type: Schema.ObjectId, ref: 'User'},
// });

// var Comment = mongoose.model('Comment', CommentSchema)



// // MODELO DE TEMAS
// var TemaSchema = Schema({
//     title: String,
//     content: String,
//     code: String,
//     lang: String,
//     date: { type: Date, default: Date.now},
//     user: {type: Schema.ObjectId, ref: 'User'},
//     comments: [CommentSchema]
// },
//   {
//     timestamps: true,
//     versionKey: false,
//   });

// module.exports = mongoose.model('Tema', TemaSchema)