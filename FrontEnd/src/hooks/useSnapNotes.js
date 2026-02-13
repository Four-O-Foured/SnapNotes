import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { showToast } from '../lib/toast';
import { useDispatch } from 'react-redux';
import { setCurrentSnapNote } from '../store/slices/snapNotesSlice';


export const useCreateSnapNote = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("image", data.file);
            if (data.userPreference) {
                formData.append("userPreference", data.userPreference);
            }

            const response = await api.post('/snap/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            showToast.success('SnapNote created successfully!');
            // Invalidate queries if we had a list of notes
            // queryClient.invalidateQueries({ queryKey: ['snapNotes'] }); 
            console.log(data);
            dispatch(setCurrentSnapNote(data));
            return data;
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to create SnapNote';
            showToast.error(message);
        },
    });
};
