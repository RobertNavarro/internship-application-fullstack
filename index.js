addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const cloudflareButton =
`<div class = "mt-5 sm:mt-3">
<span class = "flex w-full rounded-md shadow-sm">
  <a class = "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-yellow-400 text-base leading-6 font-medium text-white shadow-sm hover:bg-yellow-300 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
  href="https://cloudflare.com" id="url">Return to cloudflare.com</a>
  </span
  </div>
`

class ElementHandler 
{
  element(element) 
  {
    const boxTitle = element.getAttribute('class');
    
    if(boxTitle == "mt-5 sm:mt-6")
    {
      const button = element.append(cloudflareButton,{html:true});

    }
    

    if(boxTitle == "text-lg leading-6 font-medium text-gray-900")
    {
      if(randomIndex == 0)
        element.setInnerContent("This is the first of two possible random website variants.");
      else if(randomIndex == 1)
        element.setInnerContent("This is the second of two possible random website variants.");
    }

    const link = element.getAttribute('href');
    if(link == "https://cloudflare.com")
    {
      if(randomIndex == 0)
      {
        element.setAttribute("href","https://github.com/RobertNavarro");
        element.setInnerContent("My GitHub Profile");

      }
      else if(randomIndex == 1)
      {
        element.setAttribute("href","https://covid19responsefund.org/");
        element.setInnerContent("COVID-19 Solidarity Response Fund for WHO");
      }
      
    }

    const description = element.getAttribute('id');
    if(description == "description")
    {
      if(randomIndex == 0)
      {
        let innerContent = `This is a link to my personal GitHub profile where I have some of my past projects.`;
        element.setInnerContent(innerContent);
      }
      else if(randomIndex == 1)
      {
        let innerContent = `This is a fund to support the WHO in tracking the spread of the virus, 
        developing vaccines, and providing medical workers with protective equipment.`;
        element.setInnerContent(innerContent);

      }
    }
  }
}

async function fetchAPI(url)
{
  const response = await fetch(url);
  return response.json()
}

let randomIndex = -1;
function randomPick(urlArr)
{
  randomIndex = Math.floor(Math.random() * 2);
  return urlArr[randomIndex];
}



async function handleRequest(request)   
{
  const data_obj = await fetchAPI("https://cfw-takehome.developers.workers.dev/api/variants");
  let websiteArr = data_obj.variants;

  let redirectUrl = randomPick(websiteArr);

  let redirectRequest = new Request(redirectUrl);
  let res = await fetch(redirectRequest);
  console.log(redirectUrl);//
  return new HTMLRewriter().on('*', new ElementHandler()).transform(res)


}


