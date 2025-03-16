import { DimensionValue, View, ViewStyle } from 'react-native';

interface IFlexBoxProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    flexShrink?: number;
    flexGrow?: number;
    backgroundColor?: string;
    gap?: number;
    borderRadius?: number;
    width?: DimensionValue;
    height?: DimensionValue;
    children: React.ReactNode;
    style?: ViewStyle;
}

const FlexBox = ({
    direction = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    flexShrink,
    flexGrow,
    backgroundColor,
    gap,
    width = 'auto',
    height = 'auto',
    borderRadius,
    ...props
}: IFlexBoxProps) => {
    return (
        <View
            {...props}
            style={[
                {
                    display: 'flex',
                    flexDirection: direction,
                    justifyContent,
                    alignItems,
                    backgroundColor,
                    gap,
                    width,
                    height,
                    borderRadius,
                    flexGrow,
                    flexShrink,
                },
                props.style,
            ]}
        >
            {props.children}
        </View>
    );
};

export default FlexBox;
