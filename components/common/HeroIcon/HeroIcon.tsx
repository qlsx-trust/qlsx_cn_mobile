import React, { useState, useEffect, memo } from 'react';
import { ActivityIndicator } from 'react-native';

const HeroIcon = ({
    name,
    size = 24,
    color = 'black',
}: {
    name: string;
    size?: number;
    color?: string;
}) => {
    const [IconComponent, setIconComponent] = useState<React.FC<{
        width: number;
        height: number;
        color: string;
    }> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const importIcon = async () => {
            setIsLoading(true);
            try {
                const { [name]: ImportedIcon }: any = await import(
                    'react-native-heroicons/outline'
                );
                setIconComponent(() => ImportedIcon);
            } catch (error) {
                console.error(`Icon "${name}" could not be loaded.`, error);
            } finally {
                setIsLoading(false);
            }
        };

        if (name) importIcon();
    }, [name]);

    if (isLoading) return <ActivityIndicator size={size} color={color} />;

    if (!IconComponent) {
        return null;
    }

    return <IconComponent width={size} height={size} color={color} />;
};

export default memo(HeroIcon);
