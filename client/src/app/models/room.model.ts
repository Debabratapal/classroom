export interface Room {
  _id?: String,
  room_name: String,
  room_capacity: Number,
  floor:Number,
  ac?: Boolean,
  mic?: Boolean,
  projector?: Boolean,
  wifi?: Boolean,
}