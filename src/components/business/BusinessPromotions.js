import { Skeleton, HStack, Box, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import {
  FlatList,
} from "react-native";

import ViewStyled from "../ui/ViewStyled";
import { theme } from "../../utils/theme";
import BusinessPromotionsItem from "./BusinessPromotionsItem";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function BusinessPromotions({ cityCode, reload, start, promotionsData }) {
  const [page, setPage] = useState(0);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true)

  const SkeletonBusiness = () => {
    return (
      <NativeBaseProvider>
        <Box w="100%" flexDirection={'row'}>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(46)}
            h={heightPercentageToDP(12)}
            maxW="400"
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={2}
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="100%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(46)}
            h={heightPercentageToDP(12)}
            maxW="400"
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={2}
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="100%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>
        </Box>
      </NativeBaseProvider>
    )
  }

  const getPromotions = async () => {
    setLoadingSkeleton(true)

    setTimeout(() => {
      setLoadingSkeleton(false)
    }, 2000);
  }

  useEffect(() => {
    if (start === true) {
      getPromotions()
    }
  }, [reload, start])

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <ViewStyled
      width={95}
      height={14}
      marginTop={1}
      marginLeftAuto
      marginRightAuto
      backgroundColor={theme.transparent}
    >
      {
        !start
          ? SkeletonBusiness()
          :
          <FlatList
            horizontal
            data={promotionsData}
            renderItem={({ item }) => <BusinessPromotionsItem item={item} />}
            showsHorizontalScrollIndicator={false}
            onEndReached={nextPage}
            onEndReachedThreshold={0.7}
          />
      }
    </ViewStyled>
  );
}
