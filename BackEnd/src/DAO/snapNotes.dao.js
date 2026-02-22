import SnapNotesModel from "../models/snapNotes.model.js";

export const createSnapNotesDAO = async (snapNotes, user, image) => {
    return await SnapNotesModel.create({
        snapNotes,
        user,
        image
    });
}

export const getSnapNotesDAO = async (id) => {
    return await SnapNotesModel.findById(id);
}

export const getAllSnapNotesDAO = async (userId) => {
    return await SnapNotesModel.find({ user: userId }).sort({ createdAt: -1 });
}

export const updateSnapNotesDAO = async (id, snapNotes) => {
    return await SnapNotesModel.findByIdAndUpdate(id, snapNotes, { new: true });
}

export const deleteSnapNotesDAO = async (id) => {
    return await SnapNotesModel.findByIdAndDelete(id);
}

