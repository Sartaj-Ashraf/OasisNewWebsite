export const calculatePrice = ({
    basePrice,
    vatPercentage,
    discountPercentage = 0,
}) => {

    // 🔴 ORIGINAL (VAT FIRST)
    const originalVatAmount =
        (basePrice * vatPercentage) / 100;

    const originalFinalPrice =
        basePrice + originalVatAmount;

    // 🟢 DISCOUNT ON FINAL PRICE
    const discountAmount =
        (originalFinalPrice * discountPercentage) / 100;

    const finalPrice =
        originalFinalPrice - discountAmount;

    return {
        basePrice,

        // ORIGINAL
        vatPercentage,
        originalVatAmount,
        originalFinalPrice,

        // DISCOUNT
        discountPercentage,
        discountAmount,

        // FINAL
        finalPrice,
    };
};