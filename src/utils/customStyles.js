import { StyleSheet } from "react-native"
import { theme } from "./theme"

export const customStyles = StyleSheet.create({
    shadowStyle: {
        shadowColor: theme.tertiary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    shadowStyle2: {
        shadowColor: theme.secondary,
        shadowOffset: {
            width: 10,
            height: 10 
        },
        shadowOpacity: 10,
        shadowRadius: 1,
        elevation: 50,
    },
    shadowStyle3: {
        shadowColor: theme.dark,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    shadowStyle4: {
        shadowColor: theme.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})