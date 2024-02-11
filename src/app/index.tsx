import { useRef, useState } from "react";
import { View, FlatList, SectionList, Text } from "react-native";

import { Header } from "@/components/header";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { CategoryButton } from "@/components/category-button";
import { Product } from "@/components/product";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";

export default function Home(){
    const cartStore = useCartStore()
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

    const sectionListRef = useRef<SectionList<ProductProps>>(null)

    function handleCategorySelect(category: string) {
        setSelectedCategory(category);

        const sectionIndex = CATEGORIES.findIndex(item => item === selectedCategory)

        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" cartItemsQuantity={cartQuantityItems}/>

            <FlatList
                horizontal
                data={CATEGORIES}
                keyExtractor={item => item}
                renderItem={({ item }) => <CategoryButton title={item} isSelected={item === selectedCategory} onPress={() => handleCategorySelect(item)} />}
                className="max-h-10 mt-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />

            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={({ id }) => id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item} />
                    </Link>
                )}
                renderSectionHeader={({ section: { title }}) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
                )}
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                keyboardShouldPersistTaps="never"
            />
        </View>
    );
}