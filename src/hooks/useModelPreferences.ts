import { useEffect, useState } from "react";
import { modelOptions, ModelOption } from "@/lib/models";

export const useModelPreferences = () => {
    const [activeModels, setActiveModels] = useState<ModelOption[]>([]);

    useEffect(() => {
        const storedPreferences = localStorage.getItem("modelActive");
        let parsedPreferences: { id: string; active: boolean }[] = storedPreferences ? JSON.parse(storedPreferences) : [];

        let updated = false;

        // Filter out removed models** from `localStorage`
        parsedPreferences = parsedPreferences.filter(pref => {
            const exists = modelOptions.some(model => model.id === pref.id);
            if (!exists) updated = true; // If removed, we need to update localStorage
            return exists;
        });

        // Add new models** if missing from `localStorage`
        modelOptions.forEach(model => {
            if (!parsedPreferences.some(pref => pref.id === model.id)) {
                parsedPreferences.push({ id: model.id, active: model.active });
                updated = true; // A new model was added
            }
        });

        // Update localStorage only if needed**
        if (updated) {
            localStorage.setItem("modelActive", JSON.stringify(parsedPreferences));
        }

        setActiveModels(modelOptions.filter(model =>
            parsedPreferences.some(pref => pref.id === model.id && pref.active)
        ));
    }, []);

    return activeModels;
};
