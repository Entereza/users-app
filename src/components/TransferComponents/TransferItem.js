import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function TransferItem({ item }) {
  // New response structure has date, type, total directly on the item
  
  // Type determines if it's a received or spent transaction
  const isReceived = item.type === 'CASHBACK_TRANSACTION_ADD';
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // La fecha viene en formato "2025-04-01 15:51:18"
    const date = new Date(dateString.replace(' ', 'T')); // Convertimos a formato ISO
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).replace(/^\w/, c => c.toUpperCase());
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  // Determinar el texto de la razón basado en el tipo de transacción
  const getTransactionReason = () => {
    switch(item.type) {
      case 'CASHBACK_TRANSACTION_ADD':
        return 'Cashback recibido';
      case 'CASHBACK_TRANSACTION_REST':
        return 'Cashback utilizado';
      default:
        return 'Transacción';
    }
  };

  return (
    <ViewStyled
      backgroundColor={theme_colors.white}
      width={100}
      paddingVertical={0.5}
      paddingHorizontal={5}
      marginBottom={1}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: `${theme_colors.primary}50`,
      }}
    >
      <TextStyled
        fontFamily='SFPro-Regular'
        fontSize={theme_textStyles.medium}
        color={theme_colors.black}
        marginBottom={1}
      >
        {formatDate(item.date)}
      </TextStyled>

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        style={{
          gap: 4,
        }}
      >
        <TextStyled
          fontFamily='SFPro-Regular'
          fontSize={theme_textStyles.smedium}
          color={theme_colors.black}
        >
          {getTransactionReason()}
        </TextStyled>

        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextStyled
            fontFamily='SFPro-Bold'
            fontSize={theme_textStyles.medium}
            color={isReceived ? theme_colors.success : theme_colors.danger}
          >
            {isReceived ? '+ ' : '- '}Bs {formatAmount(item.total)}
          </TextStyled>
        </ViewStyled>
      </ViewStyled>
    </ViewStyled>
  )
} 