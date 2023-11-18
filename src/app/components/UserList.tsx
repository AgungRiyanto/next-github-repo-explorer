import { Accordion, AccordionButton, AccordionIcon, AccordionItem, Box, Button, Center, Container, Flex, Icon, Image, Spinner, Text } from '@chakra-ui/react'
import { CiStar } from 'react-icons/ci';
import { RiGithubFill } from 'react-icons/ri';

type Props = {
  data: User[];
  onClickItem: (username: string) => void;
  repositories: Repository[];
  isLoading: boolean;
}

export default function UserList(props: Props) {
  const {data, onClickItem, repositories, isLoading} = props;

  if (!data.length) {
    return (
      <Box borderWidth={'1px'} borderRadius={'10px'} width={'100%'} minH={'50vh'} marginTop={'10px'}>
        <Center><Icon as={RiGithubFill} w={300} h={300} /></Center>
        <Center><Text>Search Github User</Text></Center>
      </Box>
    )
  }

  return (
    <Accordion width={'100%'} marginTop={'10px'} allowToggle>
      {
          data.map((item, index) => {
            return (
              <AccordionItem key={`user-accordion-${item.login}`} borderRadius={'10px'} marginTop={'10px'}>
                {({isExpanded}) => (
                  <>
                    <h2>
                      <AccordionButton 
                        borderWidth={'1px'} 
                        borderRadius={'10px'}
                        _expanded={{
                          borderWidth: 1, 
                          borderColor: 'green', 
                          borderRadius: '10px'
                        }} 
                        onClick={() => !isExpanded ? onClickItem(item.login):{}}
                      >
                        <Flex flex={'1'} justifyContent={'space-between'}>
                          <Flex gap={'10px'} alignItems={'center'}>
                            <Image src={item?.avatar_url} width={'20px'} height={'20px'} />
                            <Text>{item?.login}</Text>
                          </Flex>
                          <AccordionIcon />
                        </Flex>
                      </AccordionButton>
                    </h2>
                    {isExpanded ?
                      <Flex direction={'column'} alignItems={'flex-end'}>
                        {
                          repositories.map((repo) => {
                            return (
                              <Box key={`repo-item-${repo.name}`} width={'90%'} marginTop={'10px'} borderRadius={'10px'} alignSelf={'flex-end'} borderWidth={'1px'} paddingX={'10px'}>
                                <Flex borderBottomWidth={'1px'} paddingY={'5px'} justifyContent={'space-between'}>
                                  <Text fontWeight={'500'}>{repo?.name}</Text>
                                  <Flex alignItems={'center'} gap={'3px'}>
                                    <Text fontSize={'10px'}>{repo?.stargazers_count}</Text>
                                    <CiStar/>
                                  </Flex>
                                </Flex>
                                <Box paddingY={'5px'}>
                                  <Text fontSize={'10px'} color={'grey'}>{repo?.description}</Text>
                                </Box>
                              </Box>
                            )
                          })
                        }
                      </Flex>
                    :''}
                    {isLoading && isExpanded
                      && <Center paddingY={'10px'}>
                          <Spinner size={'md'} color='green' />
                        </Center>
                    }
                  </>
                )}
              </AccordionItem>
            )
          })
        }
      </Accordion>
  );
}