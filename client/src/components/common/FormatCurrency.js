export function formatCurrency(price) {
    const amount = price || 0
    const formattedAmount = amount.toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    const tlIndex = formattedAmount.indexOf('₺');
    const formattedAmountWithSymbolAtEnd = formattedAmount.slice(0, tlIndex) + formattedAmount.slice(tlIndex + 1) + ' ₺';
    return formattedAmountWithSymbolAtEnd;
}