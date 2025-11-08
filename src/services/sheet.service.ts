import { SheetModel } from "../models/sheet.modal";

export class SheetService {
  static list() {
    return SheetModel.find({ isActive: true }).sort({ order: 1 });
  }
}
