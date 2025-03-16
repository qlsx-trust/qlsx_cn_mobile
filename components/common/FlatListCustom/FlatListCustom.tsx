import Loading from '@/components/common/Loading';
import { PAGE_SIZE } from '@/constants/common';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';

interface IFlatListCustomProps {
    isLoading: boolean;
    isShowModal?: boolean;
    isLoadMore: boolean;
    listData: any[];
    onRefreshing: Function;
    onLoadMore: Function;
    renderItemComponent: Function;
    renderEmptyComponent: Function;
    styleMore?: any;
}

const FlatListCustom = ({
    isLoading,
    isShowModal,
    isLoadMore,
    listData,
    onRefreshing,
    onLoadMore,
    renderItemComponent,
    renderEmptyComponent,
    styleMore,
}: IFlatListCustomProps) => {
    const dimensions = Dimensions.get('window');

    if (isLoading) return <Loading />;

    return (
        <FlatList
            style={
                isShowModal
                    ? { maxHeight: dimensions.height / 4, width: '100%', ...styleMore }
                    : { height: '100%', ...styleMore }
            }
            ListEmptyComponent={() => renderEmptyComponent()}
            showsVerticalScrollIndicator={false}
            data={listData}
            keyExtractor={(_, index) => `${index}-${new Date().getTime()}`}
            renderItem={({ item }) => renderItemComponent(item)}
            initialNumToRender={PAGE_SIZE.DEFAULT}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={() => onRefreshing()} />
            }
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponent={() => {
                if (!isLoadMore) return null;
                return (
                    <View style={{ marginTop: 5, width: '100%' }}>
                        <ActivityIndicator />
                    </View>
                );
            }}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
                if (isLoading || isLoadMore) {
                    return;
                }
                onLoadMore();
            }}
        />
    );
};

export default FlatListCustom;
