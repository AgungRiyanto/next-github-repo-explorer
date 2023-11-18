'use client';
import { useEffect, useState } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Container, Flex, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import {RiCloseCircleFill, RiSearch2Line} from 'react-icons/ri'
import {CiStar} from 'react-icons/ci'
import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';
import UserList from './components/UserList';

const octokit = new Octokit({})

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoadRepo, setIsLoadRepo] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  }

  const handleSearch = async () => {
    setData([]);
    setRepositories([]);
    try {
      const res = await octokit.request('GET /search/users', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q: keyword,
        per_page: 5,
      })
      setData(res?.data?.items)
    } catch (e) {
      setData([]);
    }
  }

  const handleClickUser = async (username: string) => {
    setIsLoadRepo(true);
    setRepositories([]);
    try {
      const res = await octokit.request(`GET /users/${username}/repos`,{
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })
      setRepositories(res?.data)
    } catch(e) {}
    setIsLoadRepo(false);
  }

  return (
    <Container maxW='2xl' bg='white' centerContent>
      <Box width={'100%'} padding='4' marginBottom={'10px'} bg='white' color='black' borderBottomWidth={'1px'}>
        <Center>
          <Text fontWeight={'bold'}>
            Github Repositories Explorer
          </Text>
        </Center>
      </Box>
      <form style={{width: '100%'}} onSubmit={onSubmit}>
        <InputGroup marginBottom={'10px'}>
          <Input size={'md'} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search User...' />
          <InputRightElement>
            {keyword.length > 0 && <RiCloseCircleFill color='grey' onClick={() => setKeyword('')} />}
          </InputRightElement>
        </InputGroup>
        <Button onClick={handleSearch} rightIcon={<RiSearch2Line />} colorScheme='green' width={'100%'}>
          Search
        </Button>
      </form>
      <UserList data={data} isLoading={isLoadRepo} repositories={repositories} onClickItem={handleClickUser} />
    </Container>
  )
}
