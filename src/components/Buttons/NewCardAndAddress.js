import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function NewCardAndAddress({ title, onPress }) {

    return (
        <TouchableOpacity
            onPress={onPress}
            width={'16%'}
            backgroundColor={theme_colors.white}
            style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: theme_colors.greyLine,
                borderWidth: 1,
                padding: 8,
            }}
        >
            <FontAwesome6 name="add" size={13} color={theme_colors.primary} />

            <TextStyled
                fontSize={4.5}
                color={theme_colors.primary}
                style={{
                    fontFamily: 'SFPro-SemiBold',
                    marginLeft: 5
                }}
            >
                Agregar {title}
            </TextStyled>
        </TouchableOpacity>
    );
};