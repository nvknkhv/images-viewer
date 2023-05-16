import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Card,
  CardHeader,
  Flex,
  Image,
  Heading,
  Text,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { BiChat } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsList } from 'react-icons/bs';
import { GalleryInfo } from '~/model/Gallery';
import { useGalleriesStore } from '~/stores/GalleriesStore';
import styles from './styles.modules.css';

const GalleriesList: FC = () => {
  const { galleries } = useGalleriesStore();
  return (
    <div className={styles.Grid}>
      {galleries.map(
        ({
          id,
          name,
          count,
          views,
          comments,
          description,
          imgSrc,
        }: GalleryInfo) => (
          <Link to={`/galleries/${id}`} key={id}>
            <Card maxW="md" key={id}>
              <CardHeader>
                <Heading fontSize="3xl">{name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{description}</Text>
              </CardBody>
              <Image objectFit="cover" src={imgSrc} alt={name} />
              <CardFooter justify="space-between" flexWrap="wrap">
                <Flex alignItems="center" gap="8px">
                  <BsList />
                  <Text as="b">{count}</Text>
                </Flex>
                <Flex alignItems="center" gap="8px">
                  <AiOutlineEye />
                  <Text as="b">{views}</Text>
                </Flex>
                <Flex alignItems="center" gap="8px">
                  <BiChat />
                  <Text as="b">{comments}</Text>
                </Flex>
              </CardFooter>
            </Card>
          </Link>
        )
      )}
    </div>
  );
};

export default observer(GalleriesList);
