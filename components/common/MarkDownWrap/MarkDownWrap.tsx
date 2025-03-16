import { useThemeContext } from '@/providers/ThemeProvider';
import React from 'react';
import Markdown from 'react-native-markdown-display';

interface IMarkDownWrapProps {
    content: string;
}

const MarkDownWrap: React.FC<IMarkDownWrapProps> = ({ content }) => {
    const { themeVariables } = useThemeContext();

    return (
        <Markdown
            style={{
                body: {
                    color: themeVariables.colors.textDefault,
                    fontSize: 16,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    overflow: 'scroll',
                    lineHeight: 21.5,
                    marginTop: -4,
                },
                code_block: {
                    color: themeVariables.colors.textDefault,
                    fontSize: 16,
                    fontStyle: 'normal',
                    fontWeight: '400',
                },
                hr: {
                    backgroundColor: themeVariables.colors.bgRevert,
                },
            }}
        >
            {content}
        </Markdown>
    );
};

export default MarkDownWrap;
