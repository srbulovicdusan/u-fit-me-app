import { useState, useEffect, useRef } from "react";

const APP_NAME = "FitSa";
const TRAINER_NAME = "Maja Petrović";

// ─── Icons (inline SVG) ───
const Icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  trainer: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  packages: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  workout: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5" strokeWidth="0"/>
      <path d="M2 12h2m16 0h2M6 8v8m12-8v8M4 10v4m16-4v4M9 6v12m6-12v12"/>
    </svg>
  ),
  progress: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  play: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  back: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  fire: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z"/>
    </svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  image: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
};

// ─── Hero image ───
const HERO_IMG = `data:image/webp;base64,UklGRuRQAABXRUJQVlA4INhQAADQigGdASpYApABPlEmkEWjoiGhJBMaUHAKCWduVMIDNkIk8DOM5B+5Z//WLuKWtCH63M2v/W9f+4h82X7lerh6dP7d6hf9D/2nXR+hn5eHtD/u9lBXy39rPS98x/pf+R4Y+ez7lLFce9Sn6D+gs6/+d4Y8CN+O4kT77231O8Uugb+ovWG/5vM5+2eot0yvRt/a8dHxtnL2ijJieYAJqcF9bMyhKSFGfN2JoQwz6U4HNIBD+NERb0wMhj+JVLXmtPudXNjVdIXQTvpeRr5aalblm906Ku8sXMWaAbAqRrmcJW6OG3AmN+tuKt8BXUqTq+gM+y/5vH200CfNxv9VGpeBdyXesq83hyQTjRq7oKNPotWPn6vml51ojeWav2Fz6vzvXwBK7NTGdC2qUQeJPeIDzOlpRaOOMUoc5T0COtuPsgPjSgbiQriUAmsYWxDNib+87KuRtvz/115Pqo/ukeIorEiVNW4sqY2Yg1luT+9M1oMYtOo8ww9kP3IckCofPzYFPCL3yv2qgd5uTJXJopFvkRWnrV8BH49n/ijr5AvU0oXndpwq5w3qD6iyp0jwDZ04oF5AswGcSDjza7whARlwpfWPtz2uVf2vbs9zNJFrotze39Cwd0FgH/wGJogrltOKgVbexNvMt3sA+emiA+SEYNr9gVo+F/vj1ojACsizJz0oPSQo/UFdPzWENv6v8d71Fqcsh7V0A5eoWIiwgwYyTqq5+MvGhKcd2Nasro2p1Ni2DhuZBugMcnDMMd5fNe3iyhFVa8gUwwqlD+u7h15FGRg1GZrMEl1u2ZrJfDzEc1YTs5G6I7mlcu1Q94Zv/JfuWfNOG6Ci0PWKEUW7zmYcO6VVehi1XMEcjFTe9uhFnIy2zAQjip5Rblb3a8ghZ9PyfL9rw9LUcltmtide6aItkWFpxtwLqEF1zTwhtc1iCJiMGVKec+3OUKDAWWW33umm41D+YxhHqOxj7jRAJe38z6pykDGZZW7N3qIYOMUdXb71CHeLuertHDPO936UZGljqyNMiphMzI7Jp3uCAeReUmZJCWeheef/+c+dy+Snq3q+v14OitjB73pT5/M0XCZodscK1+3CvsEBdIERz3Tv20LIC2cwJIFOP51EbKpFSrVOYF9uy+qp/XvIN5ITLu1CXGLJcygQjqz3wzIpV4LN3ktU9QXgN2j/YsCztaeFxrubemP3WWosb8OFitearRz8RZgil/atX4mzr0Qxmkfk8G5wBJCBthAEO9X5uc22zimHzBVU7hxEl4mmPKFY+vYA+ymtWvI6/62cM9Y/JIWJABcll6sDP7mkcq3HmHejyQeWWlhcK+VcSkyqupRXwmhPJXm9WWPcr6wlSOH7x08xmShsUSHc2VkrAJC0n00j8mHqUYj9G69wN5lzP9Hv9n+pIhSvDEDdAm0h4LFTUfErxdCSomjbGPSUOuNKO/chPyLYEAlAWG6h4HfQRSRpL0vpRr/2JCLC/IaZyH9kZvk9Mr2OkNuJbN+9xRwla/RaHCLVQ38hFkEeopYwMU4XlQXvg8porrFYZP23fnDoNot8n0m8vf+tTSfbTb2J/O9hGRhYhzwLSX0hVv3wdqbHIv2VPGL0Uj0+0x6lktNE/6HvpZKUiVN7ubIgvVxSCdZIvwhGJRah1iCidGcXl7Vthyj1+Yanl8hkytm5xIGaPfEewzr4DzObM1EsqhNuS9UoUxxvkfZe2VcdUCyjLwr7FCt0NyiT6+b/z+zyoJuVZlgtTACDy06Nb3gtUl2L3tNOx+R1rfWyGJfCtpMMyy156BijiPqtfiNAa7Rm23IpYfJI7EkDq+isK47p4fyIMgKtjrEMhUZ0EjFvyhOieddLsJFMiQaUr1d9EJjEjft4tGmKU3u9AIkTZeBByOixGDHDJFeQHjhe3Mk2Z7CgjYN/5mKQrTw8yN0zrPnnx0sox1mTeAMrdfcuzaQFF/oqBQIZxZBgBaoohgtbT+YnVHWRoAwqFr57iI2dLcJJb61SMQ+KrNzXdM39nhxHkerIYsVT6JfO2exkfL6467cJCqYzqhGDd2tTND2iI9hYq2ua/Y46OFF3p4ZTqWs25Z32c6ny2R9p5+4YidRSSik4Lx5cr1s2INM77BXzi61ezDHpuEDGIyItFodDUqplinVPoQFQ9LVTUvt/OgleNws1tHWQ45KjICuW4gaWIxnaQ3O3+qng0qXz1muOfiP8Fbal5OA+SVBwdlRVizcQ/DD1BMO32TCKbWQcXsjbQg9m1Hz1X5kgoC5pRO3dPNGClm3wwLnsLzs7pHb5lMjbwlOWJPdc34zr4SQD2kL7AdlaRfIahkuZyfWx6EvZqP7mV50Mx+Zx5pmhz6uaiN0AHr5y3PNsJYvC3KhoCKC0OQVNCCN4A+OpUCZJ96fKM2exyTJpJWtqmkoUTsNMlCAY7X2lap41lvMCqkD0eY9L0vsul57gY4I2htkoMQn1FZhgADrLpB693YuxNNfztFlqeXCP6QpuT4FJpWBcbBdJKyd1mikmo3wHx98xsm0nZlf+fLAMn9OIplbfHPYhp/yOdiNutIcrSbjNbdjZAaBlaGzryy17CfddkoMkHeEROor/4ReumArHVeVlsGVwWU+AJ5kO0sshcqdIGvIOmfrFY6S1l3jKLPLNHPmmOLUocGzPFDbWRaiWfiA3HXwsUqbPSNTyE89XGE59VO9/tXk6QHTerHFwiR5AjMWajkt95RlSrbZ6u33EDfU6utXGEpcFuFBJtdSiKdLQqjlfWhkjBXwqoEprroodxpYk5oRImLt4vH/i1vEC9ofi9Z7VSV9E3yYZUnh3qbpSpD0gJlH6rUz8572JJu/OazKDkRV/2rq9MJLqnLzGmT/wXPbRYJ4wxcnYWNsidEx/qfxvgJ+L5nOrImjWH+WU4XyfgGKqz4ie32ScT9zFhrXpvcqklras8ARLmAjomWRV3Zkh5zKV901HK8271hxUUsiDxs5hJMVHNRRT1bCgrkECR1sRDRsPGupKDtzEmOs6aIL+jPnPwGvO8V0JVh2Vd5x5n3E6XUPwqrVyBEFLHBifdys8Ri2xQWVjhWv8iA3bCPmtRN54Aqc7V2XyleDCnpVBe7NCPf+YlhgdBpmNe0i8IiYyeuxGSpvcHS0lyVryYfKhvub/+WVs4cf5DNZsLNEmO6lnWMmjirfSTk+0dGbd0nEmNOjW+FSKaclWKti4Lk6scywAPbyvtVyoAyQq+236maDzIqEKl8LA8YC31yjbIQntsyydfz6vUl0IjAx+1MikHOC+fcH8vS59LVxctLhgfkVUAWEWF2TyButzwycj6tYnPQ06h8fkU9T29ABIv4l9W1slgwaUoslajBW8MnluuJN2MjXPWfckzvYPPnbaimCbLlcVLLVpoN0abr1sq4OdKT9qNOWMCpiOggarD+zxKTBvU2uA7ckWbbjRKo/oBMOeWLouDlmDF06N//B8UCeMhfXDL8bxZx1WZo38IrYeqBLOMEkWCiNN87ICi0JpB1PO2tVHWoTiQS/ED+YXSVJWT03GMkcToZbLnbur0VRazz0hii0+ZQwbfke6TjW7CwkAcXEaFBAiMVu95opliC44Vkcn06PSmZLt+udto6zrn9rJJtGpl8IJ5rXAmrpwj7r5PI/QlH372UDmbdSTb7NR7LtOT1FPg6fdNutzLXT7BiWqUUaNa1gXDW9UKHpCkPygrWFsC+j4To29ga3IrRbPIYUTL17PLBXtzSeUm9+zuE1w3qLC/IKOYfrNZEDAztYczp6RDpp6zsJLOfwGeacefdBjzZiekuVtEjSlWfcwbmAcj/+CjDU+65EQhvGXoHWgoa4hmcubCQx2wgwN2dxf06hoEUAg+lW0nI8HQz6HCTquLFbKfFPEr0w5eEC7BxNEjU305O1smuv6rvnnJ3Zjizh2zSwmo+8piCKWcBSUguJ650ok0nMRa7x7QEJvLcN8f54wShh9AnYDXhDL61MHT4t4pMjNaSRoB6q3NUQtDkzaV0EdhD1KJ+n8LthU2a3yBCc+JPdJ5wjNvgAt0stjv7T//tD+PV3PR0Bg3YFWj39KyZtMpSZsR5cNj5fdD5y5MRw0PWFopne+gDtMA1mFCtDmNYsR2x4gH3YGoQuyCbo5SC4IwMrb7Hk3jwIGw8AIIoZhhrJhHssVwOebQjHk6VjoYqpIMXBSPtnVpQRaZrOUiPM209UYLVNUmjwcdyOojPqzBAQWXvleAAD+5BclewGJuVNsSFce/HnQ7Er/G+dpP9eMDVSBTFEBPj9iOSVFRfein3Lu/JjfZIEFL66cOR6t+vQZlYOPKnAa7Iy5xIuYHwJekDbp2k8hJKQlsBVHeMQAtZdpNmlNT4dNaWdS3YE3/oCZYggOD+dZR/D/HepRREL0LOIeW/cE5hVbLcci0Lr9MXaFoIT4HvVRFCzshTg7/P+xdx19DannrsSfNKrOe1cLccDBZj5RKpUPnx08zE2igr1aVkweQ1MkIclbkfiVG8vnTiNkDBx9TTWQZcj9JpMn5NAdTLAD5iLFO4d5lrAOE69q3+1RRriyYFmU5o/qRdg4zo05tCK4eyryiyGH2Hoir7qv4OEoTzHXS1gXLD0W0HaplovOGcXSEngK5muppRhcCNW0drI/KTCMpuHWnDtk66MzOJtZyZOV5S5Tmptkdtsit691Ghelzw9Yne9mOF7ZPLOYb5h4pSjqHpb26/D+tFSS3YpFAO7LKqcPGqvt9O8ZIybMGmR1P5ZnuJDwx2iZPbuOZvIqLuwWaSwDxfsLO75GYK1rVCOiEHTb3Fgspi+J6Q+i0ek370YHEIeNOeTwFNnxgAHqtC1+sqz6u1EaYrpiSIWrFo84IMW1fGluJM3dmqnpfRcsoit6CsawtsSlY3cU3BsKZ2pFX4nOeauhmc9STMOqPf5KTKvinxfd90QyY/NqLut5cAonyFln5NatjfDGLGD6qU3pOY823n438kCMcZwRVWPegyHUeA19OrSOPhqW+5UwtWPB9oKMdexs3G0exrfucD/PnEo4Mz1evHKnN71EFTUxoPMVkvpU+wmL0nTAtNnYvCZe8MJ5xAcORw/RoO/t5Vd3YXp4aoOu4HTa+54cn3TpOnjLV70v3uQJlcyftS+e3eMoR/JgS0m0jQZRGwZ6LAGsLS+pnstVrGeQWFT9x9fAhkSvEBqKebtYlOrtmX1lnp0zsiOMNOeUOV2P9227MvPeD+bWOkhCrRwsVkjH+TSqzt2UIz6kodM63lBKw6aGapkthEaDO1ka0uhu55XP/AFpP/NjHYHxZPfKZtFUzCFbns1qSIpigS+MweFKS/Napa66zykokIUZRJUBGCuy997nPgzlJdYps+cP8jf5Ur2PDvYTL8vAmOU+O5nQReFRlEw3da/W+QKC+95CE91VhJlUaxH3bayDovlWXhPO0CpLNf1l5qNdHoJTdvQ5cFfUclIeVx7gTT5ZmWg7IZTxN9Xe11YaFD6ulX1GfLzNL9icVpUmdPQ2wj2S7AMM8p2QCWooEdkS58KWcc65c5ves6JJOdiqCH9+00aGUzOnErfOZQU2fFrzb3rErVr75tnDRMD+GZBUclFmjbwTYLtT1xAdtp+jrFjyVQXI/QiIpE8ReRhODDtkPg1QHaAk2VJAVdnrLalsFknfTSN9/UyyGsd54xCBLB58OjeDDcaR5L0ObPNZsVjcigTrlDtHaKtukYlveWYnbBuKP22FS5bCRHjJdSn1t1RcHZSBbHpcdvJ8AYoHWqjF5PZDL1W7r87iC9mEVYFY1gINamPmilDyhr0gtwtqXqvAxGD0JL7O33KyNaetHl66QgC2OySsB4eeqytPMJt1Qqb2QwaXUCRhI3wDGUV7dBHVbVP5KA2CfIPvZqOnA6OHTkhkBy14LdM4L1Z3NQY4TTIVVDB4vxmRaoA3Fg61s29IuYTGEoF6ePgqotTh3bQESROXm3FCCJS4XJQGjs7Lxt3QyOa/lB34yn/Oxt3zOfwm5LLlc3iWpjrQHVf/HUi9XVP0VAmjE5gMtwbwTeT8qGGdfQDAFMoGTyj6xq4PrPpU7c/dZ2lrrg6wDcUITsGJRoJ4rbWMTbpxyOdlsA1miWmHG/1Nx2V7kpxlciOD2qivJqfjMUcTknO3A5/tJoo4JrDVTBfzv/qg+NaL1LNgG3tyGfqBY9a2lUd6yIY3RckQjiAYVhaQpBKUAnT2ryGE33dYLL78dQmvRjYahtvZuUW1KkHWDEuv22DRb8OpcMnQk4T2enBJqLXY/LLDFdJEAQBErAP7SkF15SpNHs2JQmkX075+67GjJnBkTdozrHlwNmIAxrk1vcet4XAtevzfx0PMqd7NhYBfavw2o3UO86VKEqUfbttxUoE+C7gWOU2+wZKWMnEAqCJIB2hin1QpVsygpSXQRWX+upqM/3MEzNMgm6SKTbEVxH7OB9YJYEJTKAMx31hau0wb/+08QzQWmqdvu0zfkeODQaHbg0TjFEVp6sbhKy7eGOKtYQCnzP0v1yVpzW6LNYxtp0EjM8WKIJh/6XPiKD2drhldETu9mOvH3DYY4AgKo+WiIGlQQoJR2fUDa6flCaYJ1a911z6tjnX151+6ri07Vf3Y5q78JsvppotLguT0x0SxKbdLmSeTx8QUgoFvB5aGrejyi6OhMAVQK837r7KZ/ZjAv7+oEBt7c25YUsx9FC86NF28VCSNjOT61Lep0FJMiiKfDhGMcjtvxWbAmDiuc+Y51XYxfvvwhv2if/rSWJ+NBmlYHCbJJfZd4XK2LRDR0NYkH9a1z7b1XrLACEGjSkms4J31zHRC3mOdgjSZimczreYJOqI0Pn+wuaQ35ENmUi1LofikVnnuKlLcvwtBWhBRK5maEuQlZiMIpd5moFUwTNvtyzMkYsZxlfHFphOOG5s6vUmreVA8xl00KUA3rUt2kup7IHVgswCxe+kOwdLsBRe3dsDG4lbmTEKtwH5UJYo5IeG0AM30xovaMvYH4033DzrPp3LHYfxNl4cjdYf2KPRHMcEWrf6y+5a2ryw590/zrH5vmvtvWj88XCyyH2qn5MWwVpqv87JezKfr3HSAa8n717TT0XgX5ePWgl8aDc7mud9JhEF0cDhNHPtYQcimmd9XLEoh8lb4U8bTECcBiuMYHKblx0pbKrptF3M15MHT75exQZ5POt9FJVZ7x4hA7fwQSzxf1oORsTKKPE4Xwlj2nMIrXSHf57RPljSUuRib3OgCv5TAHKhOUR3fSMUINgea9e5pOWnFw4/59UBuRec3DlYZ0N1ntZ8Gc2DtuuRyP560Nj6f/yNNX/o2UvrRIuS3y08NRQqSFgFLQ+m/QkSsf6YiCoiMbbt5qLl4eoiqP7KA4PCBqn6kH0F/9R7KKRap1NnWvvV7jU5oqjqF3Qqmv6qeFfdlerJGBvqD9q7C8cS7jK3JAWTYWr746uMctPuF84xR3vJb1vrOoM8FVABI8oFIjLnfrE1uSuuusTNEr5SiczNplMf376O5df2P8YobpW/+Px56A93Yf9r03VtjxjfTQVVAhGVNxQfvRnz9f/HiG2ywLt7PHns5e4jKTQa8LVtcbMY9aZotXAZBGaOUFcucrVYkPifnc7l8XBKSaB4hnVy9kp1jWEwzbAZwOzR+0llcq6+F/TEBdEPnoLqx7AI5mJUrelDtjZyfbe7P8WHwQk3dsDV6gyjOwL/rHn+r3M1/Mm6vEMYtpMLCJbrU4/CaU/KrE+kIjiJ7xoszRnesxchbrolw622n/xNdP9iKQGoA1r9co2zz28cSqdTS/B/IE3HHPUg1Vv/Qj4Ec0Jw5hqNb+ZB65rZuOEkU2DIdJsr2UjbCbJfS1zknegH6OGqgkxlcnPJS3htmZlDlOH/pEDJSQoXV2S5NMxzflzWVJOOOO5s5rvJFqANiL641KURhvMUfttgw03h2b9jJe/1dvouFbxcVmE+rCEHDe/aeQDvHjLZPuDl2PQPWCgcIPVzfVuZgt9RWOLp3jycqIYsUV8ZUMGPohG5KKVmPGMEFbTtvy0+N4vwsBaxcs19ChkKtAdBdLi30bSXcqy3iBfQUobuFVdHhtPlY3PCSIu9Y8Y2CG+y2o6gAXECN0bWSO2I/yK+tcLFZgmigthUgUbMPrUll4KjeWGbNnAc2j570+9s11oRXDAk6XWGzDO0jJ7uzbd8HJ2w6qflji/i6wzLRwfdVhdaOj0sLpzo55Kh9jrOzm5nBdv5DQBSuGKpqSBpmDnlc6Omo4bk3ZyluIKUHALbzGoFVPe4QqurC7h/GP26P3jaPe1u92Ap3H5nRFamezOU+YtuRLEoMKGwPpkH6zOOoubN94mlLyA1ZF/nFSPO6PbZtJlYroXs8SaeQlxmLjMSWFxXVKuduef0+TxNgxaA4um4L8ggi492FBHp2tHpehJUwLmPRn7XNLhF8r4utrxejP8OPnMPczyPEd9dAKzHqwiIz2OD+3RlruxTAdZFi51jjV7+cQheGp6YrCRZw8dt1IDPMwzKTC+vrRh6Jr9wqjSXCw4sp76CexL5wN4V41eTI7QzkzFNEk8F13m3OHhJGtDrt/Sz4zaUq/P4hEGFYzcE3toOE45Nkg4GF9S4cue3Nci4/gitcDBlL7PGCm3Telcly2DiIuoriOzJLpNGVkR1ZC/Ajvz169CDnBBFSHXryk4fbuFDtph2EBAVgiADsHYDLfwYBI0X0Ck2F6yXlQdudfaFU8P105PV1MKWcCLwlpttBY1wRDxcbLBOnXAsB8VXgaiaQ0zj5UMS0V4U4p11JUoH1G81hgH6idYPYQjFI6heae3RBryWLn4+/PDl0I/n0ss5KGjJmraajfGDJUJ5sB+4uE0kiHZQbyH0rfYXtslbnv/sJkoDtSQQjpdZS2N5I9zUcmsraRd5yvwvjIorIrYazAbJFcaCgk9vIsu1bZ8S2XE8d0qeun/67wiKYnD9t5HMbpmI6OokJWgfZ6aqH+gc/v+i8SuiSJGokBGaneICIruN4S7JJ6fhplhf3lZQkr2LDy/GNInbfKIkY9T2YbnPihlfzOtdwfT2LMYVvhyX6DI0vU5L6amiZ7OKdEQgAJr4DgBQG+tq/Pgvwcpv8mWjNE4NL8tkQlFOx5aOU3k3PRNsUWjSY3DVg4zdTqGy+fA7c6zRHag9RU+reGxrO/IHne0WkHISRfev7zZiy9jUQhlHT7ElCsUWK93CwtuWFDOBxjSXPwEvI0tnRQWG8Di5kTyEpIQilWnYszV4OD5ACf2sDVOXvlYz/CrC67lTTqlQK6TxeEoyD8eihi3SW/G8jl8dIG8e9C8mpJ2t6NmgsZycSexz8PtuqaM9eKeaeUyP1U/EaI3QYuepPoR27CLwcCzhcYEC54Dz394Ktk87daUtAzn8cJftV7NBLRAqntSFQTgksgBFt+dmeM3T2w+pOxAjMKYyI+5ocFeuDVQsZFEHHFOVAtoFB80svVWD4HfAWySrsPiWKTk3AmxvmI8h7VXwztkGbRNtzoRKPff8Looi4cBwbUxAL3iS0+ZUbIHqfwfTykyIHwloItrVG4Iy3CM8kAEJzJJObcFJOaMSOkEvgTc0VaPgdoN5XEmi67pvbn6MFG48GYvqrWjsM+Y2A756kHIoYGhdMg/H0CEVy7hUpRDI79yVSWSTYxyt7s0O2WS1Bkz4j9OHdX93DGWPaGYru8b0jkVGMlYF47u7aAKRCkl0xCWoXyFwrJvvVgcCVqeq90f9X1LqoCgN7jY7++l++PbJG37Q1KQyvmrmnXBkBADmfRB0NdfKBZKhvCNPGeJGgNYRRDawqWyN7ZFq3DcZRHfnJYJAAEt/7hEnemrhueClDB7nep2rirPidTwFBAUpJCkqfm2n3t1/p404KBiUocjlAvHZUlv7O2WGpvXPDN1gc6VkOE4yNaO8qJMYOFwe1/CNc6Tnz7pUegSipQmhKbPPN1ryCU5PU/9UWldG1xGCpWoticTWRXmG9gk3xytKy+lwZ6d95RFaHdhMsv5cNJeB5h2C6/heY+eiUaRXOLR0TJzPe4vGw2QvnGrPqNZLjbObo2ncLtj/8bz+/f65Jranys8o0UucbYKzq47pewZ/jPi0t3j6hnt6+2K7TB+K+GSMH1iT5MQRux9M9Q9nfoxGSrLIs+Rh4fPb4y5JTeDSVyvYJM73EzWXh4BhPnWqm0bNU+vCMo28FoF0TJ1NIae1qPNQ7t849LwYtZ3IPYHU/yLjfUBjlFENt3NmcglyZ8kX7ilLUhhmkqq+Ecb6jL9fTUKt/KqUweLEYHmyeb9NxjEMkwfbPVH2bbCFnl2X/Q/9sreYrnF2EZUnaSrzVVrgHm3P5cFq9eQOt+6Yvnv4YqXIn4p+zlDtgAvekSMpRlYqWDSrHb11E2FOwQ3yxMPK9AIUpHP/tYP9b+zEI8RFxJrEANhpe59WtgFNtjjAR1ctN+tqopHHX1+oa7Uf2DAabVgV7zydpK+CviUCE3n+feSIIKnso00aUb23EDT/eJwTimuDit2x0spZaT8Jw0xIP4uGUcrZ9ByYSuov4XX84JzEeTCgU5iVDfgSlIN+aPcBGuAS9umujOjvc3eAfaJM3RRTSuYSgjdqJ8htJ9UbDSNklz9OKhJZPFfYvktnft4RiiU5j5/gnlntj8ycWr9bMgThOYPD9eXSbJUWNK660ZGyjAV58exqrhLDg4DGm3R7M0VDYogRfiLok/Q3GjMDSLOSsvovbilhA8DghTzbgohzmjpqE4JYJ2jcXpDIuMsXn/NWTaJALPtPt7VHvCUQxGJv5Z3MC+CCMpw6WNFIFJfP1xMWS+wcx2FhjCSHaoimTNL2M1npVN91gitfWulPS5l3Mo9y3+ZgytH3MHwRZTd6lBcQT+3uc6ED30u/Dwv/d0RZdEBlbK603W3+n4LuMMa3mV+1MtFTvRUz8viCM7VWVrn5I8AYJekDrPewcPd+bWpRulVSjJz0xJZp0CwN9x1J2INsjkQRIsGEt8RddfF/hm8ioqysp5x8N0RPpxIm3DiVMtrX879HXX9xuiTNyUlj5FEHrgGdiTU6eQFDMOjgFj0n1Y+ZYCQ0Hz+FldydyrhGV7UMOmAm3lhY1vMqItNc/vedeS7bB9M73aU8ALg3S9zYkifWHmfI2KQ893MPyU9ClPLwVIVRamPYZLZ48DAYjlIBJ9Pix5U8spLx79xZlPGbo4JglKL/eC+3Z03bNL8I3A+0Q3KOqEyi87Y5BGfmAh/gBm6Qa6hl3WZEm7nDNWPpYjQxkqFM/odPPBU++REoYXM4U9o4sbb6dPf3svXL3wZvt9BAD1C0y6HAoC+2naxeTbx31gS11Ynin9FeiolcCGjCHfyPs4xKawjDJ1Z+eFeVe0Gcr22a0U/zJWcjdPR/SeZyLEFMywkg5r8EKRkU2xOdAgdM06l1JRsad4ACKPMP5sA50Z4rpOmC1dQNx/lvXt1NA3nOygemrK3LYLgPa/G5MTtNy4+4S53EyMC8L/s9eGeXXExWNIqN+yaJspiXaj4JIjuHST6HGmeynSw5j36Y3WDksHu7UtRaRcYFHBWL3FajTAJNVT46fzGRm1cn0cB0b3C+GPTlf8sJ2T/4+4F8aCBw41LWflTtKtM/CGdNCKl2kbhl/GuLkCwoXOyVSDpvZVLi5wublwOx4e08fsa2hxiPuqAin7xvSsN60oncD12svplmjm8JdcZKxbFDOdJOJ+Jvw3NrQRNa0k9SlROWOSW9I21JKj6Xw4MBtBLF4kU2qiWE8pzMtVSI5FAlRhWV004cpq6BvOnN/I8DY5OzaRomgZrogCpFDwmGiidlCrqUkU+EEDoF3xpRR6YcAgqX82QzLORMZdvJIQmKr67/kvPiu3sJux0wQxEO6IGcj1yKF3o18dBgwTC/CdIz3FEckGc1ss+hUz6V7ArnEQnwNJMtKYEDRPVmTeci7Kp8BcW6B3FYOlwf3K68eAZDKEeu8BioeV7T8EunnPfUvDQyUPy+Hffb7oNSecNeUDR9LSoGOCaha+GgPuz0gmJC68dJ3+ei+rM/6K9eCkiYgx/TrqcCLAWGL5trh3m1Joz+MB1YNaD5Lf+warcQDBuE1sGMOiAIhFpzj9gljWsfP4kaL3GmY+EXXhHIkCVw8/4s6J+3PqnUGVKBcwd59bWYLzOWPpuezkwQAv0VEW/maqZJgUqvWgtpy1R0GtUEFFU6+dfwnJhefmKAQ8K3/LnoYyUkoY91zYZ3o7F8ec8rUAlbPys+7rjALyEkDv82Dtwu+hLteK3ALHA+x+rY6Bz9nP/SDzI/0frlAY/pNYzfM94Qv/7zJ5zcQg7LOubfATrzGnbNfSG9do7D9gcg9UHcEvqw+QOXej+ATNLf1MXE3bP0AfEk4LcNRy95zleiIgXc27zi2viJ+Snr/u9fB3CLd8QoZImCN+Au3g3osA22SZzDzJpMmn+ekxZBFPq+c8QKeiz/kn9hPjzeGwh4yS1SiSYgAmkjYZgLeG0JxVtQ5l/Inhh0AaZ70Y/nqhTdEv87HNX/LekHMzKZYbgLiqp92FeelnozbNlcZiuGRU8FKvf9I4T141LcK4cRmIknbyMSYY5L8DfFVwtcSRdFKqVM2/3sArbVY93TScKiT3n8wLyEdS1UvrdVPZAxTLhIH+m9AyeRDycprX24yP4pdtQ6eWpPxAuNwAybDj171Fe7Z9GDmjHYsvNKp2wwscDxbmp8OPbIak3YN3AxOS29nzhyJZc8Mz/HLl0BJUUWPHNoV2KKoYlq525uaHykMjVFz9+Pic9sUxxCeM2I4anErQv+sTdvALDbC5/oaI1uPs9NN58IKBxYRJf+ClaiXA8dW+L5R7WVEeXsLZQlLSZ+29+hmj2SjVcaMvVk94+QjDzRKYOaZjC5W48mSSpsFTF4Lq5JgTLM8+alhl9InkdwOHlCvXIUEN+498r2XynCQ4r36LB3r6CD2BmiP9+ZFDFS985kYEWEFsqEHwKGiNxm0/ER07rXR8pFs7E3xzHaCAD/xAEqCoukBmKaP3Bl4YVx31g8aD1De7QW0isxG2ENKQy5oL66y7A1PVTtYghfuMZbq/tEae5AP9g47sRW6C+vSbattFkSSmU6xT5AMf5m/AAA6XhE38kofKLMvoINxEcxqc8SZuuCy4dd/rNI83smdTEfjvCA47jYBOfXclzAetjGONH/oLsPwvLqXXPKE36eSy7+wKvL4aAQFpvU/Ylo/4FzJwQLE4rmvzvnLPo/3lPd6vIBQTI1GINgcdLhAgnJ9xqintHpOf9Wb/N6Hl2OfzauOzZ79YnOJD8Aofx7TFnh/JTYWnaorBfAatBs15vTX/2+7pfzT1ezjaK58V4827YFoqC9fceCT6FZ8PgLPiJbU6zHfbdrle79idjZxsb4w4tb8t7DdD5UhqXRJ1AQvC9jkL71Chi9+poNpiPdAwXPqnjR+tfRTJJm4eiQ7qmdMrvzCrK6GaiHlJXW43RaC3kxrZj1EYdOZtkXOqV3lauXhnPa+s/xo8RQaCTdmFkrmihlg3Hcarm97v+fmu6RjAfyBQxbOm2ZMiUhlbu2WtEos6njuWLXSLtnRAsawrtHTBlcGWVh7z6kcSruQ/ScdrQZsKdmtRquPjItPV2gtjxUOmkY1Iu2e94sWuICiUJD3TieGk3hunYFa3Gv25QNSfOY/pYu6NRdSH3uAJM+86HSzTpuvCmeBhqF7Zhq6G03IvLiSX7/PmsAeVn9Ln78fLtCwI+Upid/PutC22O9LUY30NDuC5C2Mxt/VDmfR6ym3xY9a4ud+MIBfb1M3VxElYZN8K2Ed/cleDmX6YAS9bYeY/e1h63EQWUtxzYg9onxGR0lPnGvZ/Hwsa9KxrFB+aZBUl1iSMUEEcQ9qHZY2u1pqFI7kenh2ckcQOGpYFRPGJDU9nabJQBDzbXn7u0RN70RyqZ6nhhL99bhpPSQxhcyJXP0UbvRKXYwMJVxqQtF2MpJkJ25KgKhABU1StapAiIEugcy8Squ4jUX1WB0bQE8z2Dg1GM9iCzQrDsZBIy9r8tH/NP75P/x27pSo//tnAwuLxosKB4Hqp4M6Ntu5O9RtVa+pg2EjmLYHlxv3JjfGnElf8tNprTkKFh5eHm2z8O2pxXs4cYQgfrODttfPc5AegCkHtoDQCb3QCciLsqiR/dACuVvlkzq8sI0CZpWCd1Tw+7HFAwww9sE0BoLUCuOETrzH4fltarBQbSTKsg2bGq7dPD0tDB/nQqMSf9x7Bp3tmae+xZPPplcx2L457WVVqwQn6Ej1dyHP6/hfhbY2z7vgqVFK5bmSXvWZ1Qd/0mg5dtkJ94xd6G0/QAC+Afgw6AEYlj8B6QKDQGO3/EMIZcWpotwWXK+AWye+b89xzSvhT6wcqR8Bypk9i6s14piPhoI0k/7GhcE0oeYC8XGVs09asGxAuJBco0ThVmF+aeraudas68glPrRrjgyRoXuxz5KMMAvQVZqWwUItrqETd65d5cgZJexG/Z+BQLSgD9vHGDYws7WVxqrUIt+ZkhvWbP2RBpwa9406ihHWhH14uytPe3FzxfnGiWMgZ2KnmCC2LBiRZlMoivw2v2OsQLkqPiEnSfhbwlpEl2I2aCOXmdbPyhQR9Ix+g41O+1B1gaQ4gqwy5QxvNYsabK1se9u3mSgNo6ZdGvNxPW/Uwcy6f0ojWnmwIReO/mzl3SVPnsEnCJbc602CdTcVfqBM012PrdYmt0NZumhpOOUntta0zjY/Hb7+vkrNkIly5idmTA20GaK98A17me/62Dyt/1dob+nVDrwWkM/qc9IfXuo02z5P0Li5zClivBJQAY2L8NkhET9qpaMQwDvw9eP0bmkhQ60LTTkplZItoKpsgZECeFVZlPIzYstso1xsFh//OBEAlxR0XZ707qH77Fck1wD5kiVJyKoW5jgD1Tig3CTu0fbu8s+xmpfP/yuX6GP8H93GgyioeGBPTZAgmhzxagYGuY+gYpMJBIlEcK9h1/HN0egSSJI8ot4myOCaiAjlnAhW/zUdC+VgNaHXARBhwi4aQmLwZDxxtxe9CzULNbjaRslClO4v0dzeKUZ7ssD3w5qImLKakZrImOg+M3BQP0UaQSjZGQqj0OiB49KaPTb8uZLYfjrvCt1fpMj8T+Y3fF1JEZMXmHb9D6MkfJll0q2pT1NKF90iWQb1bhmt1Tjk9ldL79SWeXocpupJyw/XyFY5Fj6tn6P9r6C6Xa9coA1ysAqtFsRG8dMdc+cfEAJsevZZ2PbrX4lVNXikTOXQ2wKB++i87kb5MK04E6s5qm9MLpZMSDIM7ol+mMcHa53H0NXNBxHQQd2ZZojWLwahlzKTaJEgwIVbvGarzxPfBotxgdZ0BsKdPnhvVbN7xehAqBKbHTDvSxyxq/nFr8Y3cqWEr1ocZL1VkUix8xobIBrnLDOhxdyYkFsxstEWw1bAXaypYsZfxpXSO2w86tub1rljVy3CRdNVlAnkFJZ/cBdWWQxswuUusP6xM745ko6sDEH0XNoHCT0iA5SlEjPUiMGgB6Supqe2/KRCzx24SOev1MC134X1QLXwxuZgAPwXdtHQRTTHIyulqYBu84/olxDU4DCwrebCQFWe00fa8A0vIxofwu1vPR3G8v1LgCSIj3MhNkcFYNo6vl/0ETKN4v4TZg3KOIxvp4WjnJ7zirNpSCcJDOHALKwVrUDu1NcvT7N+vpSPQ03OkR6rscAFtbVThCxvm/bF5spHY6PuHLNWeQFiqJFtAW9nUOeGvGwpd4Ecc6nE9siPagAFguEN6/6G7e/n70lUwEx5cEVMuHXVRWyVGgtpyntq9FzNThf2tDl/eQZPMpXxZnHP9gT9bdZ2eeyStrEaAgKP3lZCZeYOKgNnOOUMvw/vlAejOHaNGt5m7dSlVVMK5RO4oZxQiO0Rlg1D0vWvIVqvsiA+P1cNQa94tvhamRSods2VzdBF5bE7YVPpc9gGxLNBbPsp1mVomKip4RGAe1lF8fA+cTzN8mztIdzR9vlny0UPTcbw/t+AZkQFwlK8chBtxUbjDpKf08TXHIszybxfYHDJyBDJKTO0ilmZik/Gr+i+UKnlO7DKhWlp7nhSewOHLWpwx+JldheJHUlzFrrdhD/kLf1ZfzXcJfXTwgM9nTWhkJe1faMUejVnkdcS2w4CbuArHFxfyIj93vsPwrHk0tc5c15MSAD+xRRMCGlW1gZ7ZBP4Rc8QlIwXVOZZIoHPe1D749SGaPZUbMoeMNADwVJ23Uq4gVYOZTENADweMN/uJLNDEkYM6DVvY64nfQrcVBh/3+i2cz8yOcqrxXlvIKFG21wUkcjQTzFBgZ6dIhuIL/Rin1JWM1RXWDydSyh2PH3Re90yNVYRT9Mq7gE5PgTqhjQtxQISt4e96/e4gVk/8MmsuEBLugPO5kl5JgXr0g/bv/8xC9xoEdskmTmKq7XJP89fyoqyg+HW+c209XTpnVOKEzVYKdajh8n0GZcizX0af8SgwA5gyfDuvhzOJfR6G9TJZvquPLFOhi6Sr4pVCB4WqQRC0cFVXUs10O5lxTdxk2dsdp3BJESHV1FS3CcUP8zeNvTOVg9eZnva3qTJBkDlV+pejOcZbYObvtsK++aLW0TioQLQCzF5FQxfPIFuBQO3iW2ujMnqDAAUNin63IqNt5G74fi06coJQgS28wkugJhc7faCqqwFnHufrOwbEYbJBvNz0v1yYCy5Q6FmChURn2L09WpLuT3528U1beNRK3X/P+iRyI7pfDwJTK5R6gPDhIV5HRx6u6pF1lHGMtrh/Tc5Za6w+xW9hJ59YN5iMVsj85uTP03Mf044NroaqyWC2BUbx7UDvlOg4ENZwQmbXTkj5GrSXu6+DqgQGZgv0aIFgSX+dO3K1jh55TYqseKqFZUVtRg1xs6qdNwI3t9bEY7erHp3wOzxwVi46lAn0DIxHyela3THYjy0HmX4RZyeqCssegwEn+TW+q/jcMq4+65AxRVXoD7hqIYSXe2Ea3RVU1uMK47XMykAil+loY37JS3gsDaanBRlQq4/t8rI0M4SjBp4K76NeWHBgLNH4b7n6b7098nqvyd45BEjvp1pOymlnRfEpZBMhlGn5i6RUOJcZczoJCIe/76pUlMs+348reikoW+gt9U+KYgGTul5SiJVZ/ctMVW9/0YPesfPl7+1LoOgd18OHdK+ds7fhJ7/unUqJ0ajR2zwCoBSR8KY6M7krxgXJeVXrWLNx75LX4l7ZDom3SVkQXuZ3GdU8vlWk1sKT3bkb3E0VvTu7kw/q9iQtJgXIKqrQNe0VNCz9DMs+gFyd6rYGieo2xJfd4a2nkuefeCT0WFDRN1Ri5U1nJV3zQR1VGbn96nPiYozUUAAb/5acDB9/2hvoaWFbzhbrqx8kF1d972r+rOHthdlMiqWQJAyo5zXbJvZyS95mdWYtf1CKXtOAF0qwXgNo/p2zMh3xMSkz70lUUlXeJiWy6q5ZdcRcOrfSRMFWFz/+9smZyEK0pswF2UrEgyt5Aolg0qEWBbF1n8NdUn5yDLyWC6yVHCRMiwoNtQWCfdYVknGe+ua9B3MmNrcXw7Fyu1V7U2wuTMRt9UrvGRi+mGQojZVwEs+I5craX9Edk/AEuDPgPRCYH2DNDVlm/2xq6Gomsl/a2z5FrtpVhDu7t5l6/lUM7DfiJpX/WrhlR45/M9KndKOmkTS5FT9T7erGcmXkg6XzdwQ5sxpuDTeADRFgefx9Nn2NLm21dKWYI7M4NQME5vFcmykUq0mp2QJuvfKh6hy2CG3Cj5FmR12qoieSa9ISHWdNowhvnJdkUtctr3IcUVC6mgIwA/4ttCDX5pkYuBi/ywWErNMsctRvRufpA3+8ndpvtmobjmEKjPmWpqYoCeIBzQzDl9lisszoGbizTe9NuIMEkq5+TaP2Rw89kwN4GhIxWrsVHnB1eNCP+9OM570YYNru6w76rVtQaox5PyQ6yj5mK02kVyycSvjaRJ8PD52pNRkRcQTqib+t4viX8LGQbNcf1IdpN5zwN8aXBTmTac+whXPmZ22cv2E9EOWGPa/crZqk6KVe+WDWP+HRy27Ko2oDD9MhkRRx+wVRBZz6aRFwz/wlgiSH+0lPwNX/9Mqta4eODArBCR4JEuwihnekYbWW7Qje1PwuxcEX8tT100aWyIpWCB2ZUGQtJw0S7kLFYcWmn3jUbSI6JZmB4qriUzLx+sNp5VYQvRgWSScQN+9tU1mLm9twvdWJT0uRPpoX/+u/6cVnEc1BoIjzDcj4PpVRpetd0T41SPMfwNSPGIqCtdOzNcvD8Rz8GZAesHMd8fGy0eeNZhzuossSTEhgtII5hyOWzeyP/GX69Iwl6iaJxXDMFBB9JjothvUUVOw5Z+O7PT4GUIRPXBKMUQ2MKuPA3bL/QSfIL0Yxgtv3cxO6H6Q2wiEUYY3eUuT2HX2eUid6Uo7NPcpRFKHM08370f1e0stetkp8eMQvhXWEbvqDiTpHX8v9oLFA4SemsGUgre2yIVEDZUCAiQn8abdM7tZMyGeiJn4XZyDrYrOAiLU502psV7Rnyd0OiwVGck64sTvLzRjhxdJ4RflZhcc04mCzpso8js6oXyOj9Xt3qyCueZThoc18zYEtDA6AMo1PDDxgxQoqhNj47rS7h7X0XGP9SJu3kibYCeSv7QHcrJ33gwmnLqIX5aCMuyFymMIb3lDejPV7K6OQjBwfEiaiyoSQTAOvBanaMYaHV+5VdJleYUwcDiT/ErBF3UFbexTRfMpfiGkU7taqDCnaKIy8xyfqsnqjZ1FMIF0ol0e1lJLMUU47a9clTMaem3eXxLvn/vj0tfnPjm6y/V/ZyvMvrZLNH5uqgk5m9IFgze4q9bPwRaBd+sd1imnAj8GgHzpx87h+AN61oaUPHiJ0Kd3+lzuIe4yKZW75uQscjocbTo4RdlTlpFmOKA5gPsSRhqA9xB+Ydb/+M25z0nCjJP995bdjbDekv1mHIYzTMYYyGuvateM7Gd/CQ8ArN9GDTJcmobtHZuAd/Fp1l5SSClXhRWLpfV4/6oL+Ta9I/70YbkiblmTCw78O2U9SaxO6UMe6P99svwik60oPpEUMeYaKGcmJQcoL46+YyNyPXFzb070yPtqnN/DczSPl7tfHMrksmqn7P4wGPq626BYk4bq8VGXUjUGQTI7WwQAFXAJUUaAo927ez/9jXHKTMkiIh744kl3Z3+ZgmojevgaPTIzchWLo9Yr+LDeO/q1fDRj73UcXw7nYDQ5RDLKE39L1qG5Ods9CLgEJrDnPpJbysGlL+/9rTlgy1iPosPvQdOoFHpuJiMBdfitC8K3zBI//nbVO9V+x84vUfUAHxPrGqsOYPlNlwgo/zsMCU7rrgbo26AYeElIgcdOgnu7QfNSfl622U+K/dZO4YWmkTKd6UTIQQ6Eorw6sQSTtjij/cmxDR9ic+q8kyzpZDzqjsoNqne+fjq8jdb4DWp7/16xpu2V5eIHPIbb7yo9My7vPP1BCyyPcfLOuCh/6XQn/Tfv4M7YM6q3FnDn0Z0F6J1wHTNCdEhvgDlKNMbPUf14dpJMFNFxuAwFuA5LeeLA7Pz7Uc1dLQc2LX1H9t/UbFetSian5Fs46XcgptWQdw/33lSRlNH/zrQV5DVNfjna5P5NfCS/0jgDGROzTbO4pm/w29Rs2bUutf9q3kLRlQXT8YTK/6akBTyBKiL1D/sjEk7S1jr5kf7noZsEvrBPaeg7aBawc9L2eA/DHzfJphItZTipT3osxtRQmpd1FPiggPPBDwZCV31FDVmU8snJ3fTM/LgTwdzIHHpqeONfu9T0MU/5LpRt2gKFns2vaJi6gQcXKhFpHWM2QSkfqMbfx3yfYj+7heREeJeynbufwnR+3VGfabhoJvnD+QoBCx+EsmGzYmJDRVr619N3Myz2aijRji7Zf6FUQSdGz9rt2aRWcXc8GAfNwzDwit3hisVYcjK29ZKN/MWtkmuwAy4wgDrzv3UimzKu50XrDmIxdXb8Z16v5MQv7me0/R5FaOr393k5yeTUzlQ7JSXb2Gd5T2ecmAJaD6WSehNsrFpgxDunVKk6nQCyFsgPHh9CwG3AX5EI4SUn17jY2M+vBgsU6Z6R1GwHs+u2ZvwwtK7Jdvx0VDf2W2gCka2DfnUTNXD+h2E7XGS8dKkUq4M7BEQRe6+KFdds06CxOX3yY7wXEPVjQpAKn5SGK6HbgseRFi1N19c+cLNn8kl/HuJ0XgNB/HS8d23vCpP0Uf3xBxw22sUM/WUbAQLR7sTVbMn+IbCCJYs23Go9UCjgqAaooVZvT3FdV4OvTR+ismMmU4SfGduKAuZcsU0mZJ13b1XiESbd7TqlVL12wyWVxiVcwv7yejGjnKcLM9R1a40W+hEMO8gKjTu0mHnoOk5ulJvYG5rkxbSX0EX9FUNuVWe+ObitRFdy1hU8z8XfbA7gAGLB3cp2vbGlYxDh8dm4ioFDNgo6UOYCIUv8isHFkRkaHtQoGm1+Dct7uGD5ZcgiycNUaBgqABG3+kiUW/2l57COThj9OFSNfNMSq0fiJeS5MlcrglM1/rp5NeEwQEzyfhWbQNCE6IedGBKEQmaMXOjicGAI6SjP2WpgkUmI6EBx+3LU2l9fLtdhC0pKYNMVc4miGCOwvVoN8Ni2VHxHrJB3rd+1cE6HxeUGp2uFiCRACABzjXlfxNHG7V99pYAC4TuPOwLUKJZEGrnWa0aD8nRiVANc5iVj8S8YsUDxl6vLQ41uP9/fDFoBCpZwzkitrevRSLdTpb27Opa13wVvzayrSdmvqNIeiynXDWusf1xeo740425JDxjPl+1b3XdxZoAB3j5k5A8sST+4vwsG6t42C5ID58RFJgQULtpkIeRvIAiA7qbGbest+pbacwrGutgAh/y78QPTRKAAFN0QxmGKU4J24QpUFrhOiDatmYG8P6Oy9jWKoFin+fnxJX2MjlpyVmEeP8BgXwgaLJ2mk+d92fous0HDZW25bDobt4LH7QQ6HIFfoEgJAZa9yVEXV+NEu1D/FIXQ+b019L3CvAe4pZlMRN9R6mW6UDf7pPn2tKp2BK/dBD2jq2b5a2ieGsmiiMcblWoH18gzV2JKQlO5p4OzqnFm3R4K3Ot335HE3hvHYbca1x39eaik0TWzl9egpZboTuvPUp2jJ+uSX9uCSjY4JlWzElxK7ysTf0iz5zlxXY/7zbD32m5gDy+mVIhzHhbExyK107/1MeV7vJKBuxQyt1f+Rt7BtuyI0VI5/Ym8omDul+34Uw+/TAcq3TV4syTN2R9lexd2qgflCc8wEzbx96eqZ34B4VwPXurUZIfvGxra59ExtHoKYZuNBaN8R37KH0GunZy6RIha5dpxO48oyipD3eH7Xg5W2+hp5ShfgtRmCtnPJX/ZKbJSBAvVnJg0/WPC90Wuuls6143WYEbFUAKBSAR5+6pAqehOiyoNGiW+SF2OpO+alOfFxN28d6DZmDyAs6LeiEmLYpsxxocJeYxLKwik8MbyOxFF/T8lWEYiUbRp3f6A7wuNmvzv2sMKjaUGcamHtaNREkvbEsQHu/Z7u9VVAEOmpSlSsJFiwqOOUwqflwkvqZDa264SL78q+Sk64CsrKqI8aqpBxA0kx6hck2ca5NcDIduQC2+jkypxeUET98pYBXNew++nUlcmn8/DNrynygpQ4NJfeIpityrzrQhVU0XFUlAI+7WlefiqwTb3ijWJs93lvHoFkv9Qo/j0hA6UhaMThonWm4gVuOAKffJIssYC32T0wh2Ob5WLjC9YvyJii6PYqKomBYcjVCLN2sE3mgOWNDlME7p1iYd4JZlo6IkVuas5Remd1fS8llnSs+VrBJgY7RpJpI0ExbtEJ7BB8b2vGPXe5agJjxEi6zYYluf4MhDKyW7FhSBbXGEC+WgGzhBZeO89Hrpdkqq2xWQXqeGY0rr1pscd2a2ogkSCI2ojmkgI4KuOI8Ak6PjgOfjEnsJJ6McUIR8IYv10P+DrAIKfuOTWkgFadgHe4eqi1eHTFTxw7zCKZ8UxHIOk9fr62ZTtJfZBPasb4HBKuU6lgJbTOa+bKwVEtn3s4AcIm693RwD59KKmnPxNtK13GDwHlOf17GbOkF8Hc+woNOEKRbV0tDMxz4a4xTWM60RvOdqhXTrLfvWU3nSXIdov/Nznxg7Qp3HdoYcDkxpesqPAyTk6XK0ZtUE6pc/rs4e3fg2Y7trkRAtiiPHQloIvU8C0nnC51fqtOkrTtzrd/JiBKgo55IYldYvYVe2QBDQ5M0dFPqZBFFUh9v9Zuf6cJNzWHIvI+GXdtyTMdJXWWqs/JGv8xe9byzwQnNQj5ULoYOPwMqp+8+lMoFVGWwXArCT9Cmaze3wK1qAnurUMOUuQ5jow2eRjxUpnGXMMk0po5AqCZW9ohigS1ALtDyPkLdiH+M0rSwD3KS0nvJOG39gEEHBpaFoMENqnHG0UAAfbHE/OXD6HOd/wRa3cSRjYLWdb4tNwaoZnr6Xef5TtVXCJAT+aIf1Djtrv6/N7jgjTDFCiQZWHwlU93f4jqfpcJ5rgNvxBp5vWQhr8Ln3C0IlOQBhBavOvx3PLaSGG9eg1+QlNWYAfTK51rb5okXTgdh0ZlIQ/QkWXfE3ZCrEdS/LDFs+KXHRT7NnQXfEGUYX/DMd4sEJ9fL4D0lNoBCBnIM4RH0fPzyGJoT/DlxO0rrdQypoSLq9azuUVd63fybimGWg/FGe+Rfqy46Fc+n3rf4JRGmeeohXGgWz6ptlXs3z1rhxHllTMKaRHvMexOGQS+AOxynkhzwuoCxdsrrJeaW7DHVAm2NJG/1BW2pv7dzis+bBKCNFEio1IOoT4ruzP5nD+PPV0exm5nqgBOGBK3vS3tNpcHJ2qJmsA8loZfaBKg93R/TXJPIInEGhjYYMGHixv7KEGKBEOFC9F8afrhKgSDiX+fWhZvBwlvAYpeUTEDSXLaMW6hAAOnNLn9ruld5IiTxkOGpRXbht9vvVFJbfva008XCgkLXBnZ+s1FrxiPVxSd1yAGpywSOViVH2pgusYEKmFWUdZZ5pki+1M0WpmuZhKHpCTjQb0c+gZJT8nFEHupRayiPL3O/gQAIrIBpwpj51QsWaANvuQVRcfN+czgJe52YEsgMS9kvSA6WVRypVO6sofaqtIf1NELkYucrdyke4QJl7JV/Ki3pFc1Fnz8lMweoRXZYmdZfdueXcKwmAR31njgXOYIY7bIxuugHKIhz7FbwRmfENDxHKiMV5YRl0Avk3mgmgjOj2BHg6sC7X+t+N1qQEz9Lv+H+VmsIsjGR9kzwpyjdQQ9EK/dCQ4UCyVCFOWq8S1XpleOMzQhbaSGiTG+LRjJnctGdJa7XBAQMX7xzCbdQRJq85MySDF5c7QZ9nLJ9eDYwGgL7RM90Acyt+n8GH+WbVBWJsbCyjD8+7GvJnPQ1Dkq/sKsOC7+UZyDdVIKNhw3KWy8BtssJPYsWbOO1hTcUr7FhVj2qx6NU9n8aXnUMkrD2zMM40xggx11BN0IJ3bUW8uMjBjEEX30dKMHjcMhtcfKIelQlyfnG3imnRBWQIPE/nIPxm5HyoiLv8bhjgbtailApGqPFWslsMCDOzghGBbJGDkIba/Sqt8X6jCI+zrf511NbBFrKqq9vOP+8Ax6TvuK9iGf/wCIvY6r/O/+eRE8mWRXpmrNT28I42p5O38yhCRooFjhigk7QCvdRgV78+xV1IoTi2a/4zTGc3Zx+MgeCJblXVTMXiQ/uR2nXpEG2s7/qNuPmeeGtYzUPG6nNLaqtWoK95/ePPjFfrXjqOJFp/iLVcNdoCLStHxHNVOc68wfAKUwjqL+mrIkrbIhIrfMGrEuBJAju5DdctY0f5gurszGQ+SyUBLUnROKfqWZAEYddMDQGgHwRfx+9KggK4OKB9g+I99T0eTsdFzv5RpksWOprWLWMk+fyaoq/iGAANRrrJCWEUas+iKJn6B0YIY6LlGrhulmG2bOebIH8kfc0JNouH+6ZBzYuT9yoLnNkD8dHnDnDMl6mNwcLV1OWvJ+xUbCevyFzs61llxww71KUDAm4y+bpyko9iJXw1BcC7D0CkoW/uf2LqIbg5X5pcZVx5NRH4dkbR3QDki4u+p7prxAHYUjyGdUxQFyqqCGzXfthMQpE3P9exq3a4lmGlCy5BThroRQwHOGZlMm8TSADbOSWyzCtuiCJmVxodNlJHH+qR0zmFrUmNHNRDEzhHodiBXvzPLcvNDGPCa4ZbFuIPzA/SS2GUza6sdGwQpVQXhIiqlBYxoGUrnOk9va1MnVpz2lMfbquzzK979Pd/7bW+XcZ//SkrVX3SmKn64C3Czs3xgyLJH0ESScJqcBS8lpeE525zyQRPfmiY0XZ1d1+gJNcFBURIln5mo29xDZOr9z/Hz55cuB3bQ5eryz6K9e4qQdn4q51gwkuLRL0FtZy4d1iKxoQSslI0vGqRQL64q3htEcK3Drt6wKGFueKZprtQ91uJbNLES6NzWCFbKH8uvnGvIlF1DCMRiRm+t2nfyj4dFkGPKoXU3xCQ+pBGaA/wDoAko5PotHKcsEaKfCC3xVSk84sBKKf0u07twJJP6yj2a931ZsFQdTepbA04qFR0jpK0tDEhjKAKeauLKg6miJFgABIDlXkd/JpCFeW+96uV9oeFRH5/shvitMMji7Vh3I+aK2IW2brTascP5LxczBBEdBly1YwtbzpYRB8CdHwRN7Epg+4IraRqQNxNzq7LneAW5ko2NMJ10CBqw3XrRDFsuH/OU8FxnX1ArqFZXgS13UWUTk3B3HtV4TDj+hl4vgp/wCllWvnPH/l7tEmMZlXJbGz4AUxYRRQAzXRz+hdDSRtMDafv/8UauBaWYzFxmwjGoZT3gs0SvpvxgLzLFnb/a286M2NkCcnttv9MPGqr62z/VYH5bFAlefC7LVi6uOrdSmBGRr2S/xX1/NcnG1T5QZDK1r0mfS81ptA83TK2NIIWhKOXolq1pPDqSa51V6uITdZXOqXcbeIP5z9EhpU1UN9Kv2buab4EJqH4f69Q1qTYJdDtKoQD+RdyabDKZ8DlzFHW9RZc2bHwTRH6c1v34k8JRcAnkt3S2l4Hly2T1ipft8JxjkP6hSriYd/p1IXSKuYmez2pTiVS+t37DQFIu6pHU1pZGEPpU8SjkdBgfPRS/ITmgUK42gGcR6kMdMc+K6fAjIUazTB/nIqO4PmbCaYcntGGu9sS/3V8Os3qmhm/5/0A8SlP7Qkq96WdxVJ9tD9Z05s8cQDCOaah05zxGhIhxxG57pBo6Cby1WH9LB3nWNFxdKoMgGfNHcY2h0e2e8CGhrJuD3S8/06gKVd0BX0VDPJUt2VLMTdeYgV4M8IyQr+hBSyRJ3JAD4F+ZDXkfcMRHu5We47rkLT6Bo2PEAySEIXXH6L8TgeVQnzkm5IoYKFNDXlJl6liOITlCf3W/AN0gYePfIBR0APhS9y2aVFquyRcygooetlV9OEglgyBxnZAr8YAgWSdLreHYyCYWg44nFFMr0upG6gM+BpHQYuIR7rUGKjfEN8Xa537tfYSsSvEvNQXm85uOpqYpTYwHU64TgrJsS9Eq2/nH8HXpKRQiuZtl+iJ4Ud7OQ+c0TW62OIeH4XthR8/etIPxPfKO416IQCuqxEDWBy2PE0xB7PDF3vvwrmG/RpDuUpIPhYNPXwxhGBjFN8gKY2wyweCvuBIMEwIz2mymeSHbglFOq1vGO9UcFSwkVJuPZVh3ncTJLzrihwqRk/gM3Sa8uFP56bXMQZt+PgnXygouIEXKOi06O9qJ/Zr7kkEqQ91PNKlp42nySdwk8JVpAgE8bTdymE7GmNM/A+nNbuDGfwx9Xuek6ZpS1Ucnv8vHwtnwH789QOGekDO0jU5Hz8eyenfbSxRFaZ0zivlcsRe8EC2lCLa/cITnUx3mufgLTve+mR9aN6U8fiWApSpljIpr4ECzxY/uRnS/VSgAAa6kJAjO9Ht39TYEY/Ev+KCsBO0+MVy/5odYYTHT+6K5VpQSrgD4CdpXYorXRcREjtNmAqv4OTZsh8MW8tNMv0BbONw6PiZ7f31SHBABmpCEWrQniE2FuF183i+0+MDiLlLZ9S2zhsmMTM2uBdoSTr6YhVsC8NYlFTVLsVEYy94EU6dc4su73rEIkzzh1nxv5F+2w0eA1eXvMZOZc2N++gUikcY0Gpfz8YlfG6Wy2r0SNyiB/d5NEwKA5OnfLemUaYyyMcrORHmYGNuYio77jpflTPpoHAs5UceqBKFtRZNnn641QEqGIjg6j0aPbsjbIJyXh7f6xF8uqM9DMn0JVLl8NykCv1ib7IQIEvE8UPptdKVuUvfGjsQidqqSZIfBK7y+Ag2R3oVFk1bCUJ8osUubWzktguZZL8jX+EqU+xKrbt96ygbf3vfIfoERdJfGEhrKupgbjq0ujC6x/7B0XF/qeRiSAFlksMIZh1m+MCpEEJ12awHNs7ICkd6UOork2AUd16szwIjYPBzExQisMbMP7i5GSTUCw1MSkMQJF1benF1ZiDIKgBZ56OQXVaVe7tuXxc0Rmlb+73uPBj6f91v9Taun4Chjc1BbAisyje9BnEw6WrFl+UTx8qXiW6no43ulDGw6pPpIJEDw05JGuGaOGsnlw8sCzyQw1y8otaxM9tQktc4KuONu0xKUvi51gDgFENs3bL8drPCd1Z6vkTCzco1J/GAK7yhlMmj0UnZ6FmTWU+/3We8aYb/wZxQ2na6I8P2l/ECvLBscSTYtftj8XFcJj219aab3X3pRBhSMhdvjt6pWesOgFWnpR2mzwG6Gb7cQZtXfMIGwjVbZdnP+uR+no6ip4jFSJfiWyZkIhdRcr9axUoVMKwSWe0yQLSYI2ncsCw1f0WhTfpj23PCcus8qL6iIhTdCtiHD4Ws9jujXJcnzgSSGO0mTWEAx0WJFSIKA48D1w7rdIAAbk0A2hy9s/cAKcTfQElSKeq4eHTRrRE8GywGWIRZZKUKNx4bcbP/fC5iRWosGW4Y3exZ1f6f3USPIf/apVmo4fiDgRanuGepCvcSncqjays+aj1dN8e02XZ4jLx0DJoNrlZWbVKAIEwv3Nt1AXqmSr7AVkLloD8IJivx4/Jdoi48aOkXtFbZHd7G3EfSO9/z4TbQ32ZJek8O8Z+OUs5ULiCFy0j1EG/pC1N02dp7sysf9DeKbGtpB5RwPHwrwoQuVwcVhfz2Ko1jAwoYmeOFU0RCn/KVJ2TyU33mqmPKVvC0Wg09cl2GLxQH9Arsm2dE095DkYetG3HUSkWw4Q0nqytDk3jGtegQtBEDt3jEHgYmQ5qIb4OO7vlD6i38SkHeJNGWXgwvKmFPYGSFAljZEX5pzgs8XBeMdw0AdJxDZmh5Bjl0AdovDiIEjWCCobyZu+Tfv0XYxKQmrAmGYIAAVggM1TSV0TQFD3ArgkBJkBLkV3djLFFpKGszXBItTNeDcfKjyfp69pRFGBuxXfsUm93gbOAvCQ+Q4SJhXUWiBFXSzJpHI7/oNBCivnhtq1H1enMcpO786SzR5lPBY5kU/5kxvXk4xC1aB3WGxdr2nABgCjcyEztN59XYu60PdygSvOgYoZ84j6AAAAA==`;

// ─── Color system ───
const C = {
  bg: "#FAFAF7",
  card: "#FFFFFF",
  primary: "#8B6E4E",
  primaryLight: "#F5EDE4",
  primaryDark: "#5C452E",
  accent: "#C47B5A",
  accentLight: "#FDF0EB",
  success: "#4A8C6F",
  successLight: "#E8F5EE",
  muted: "#94918A",
  text: "#2C2A26",
  textSecondary: "#6B6860",
  border: "#E8E6E0",
  borderLight: "#F0EEE8",
  danger: "#C4574B",
  dangerLight: "#FDEDED",
  highlight: "#E8DDD0",
};

// ─── Data ───
const ONBOARDING_STEPS = [
  {
    title: "Dobrodošla!",
    subtitle: `Ja sam ${TRAINER_NAME}, tvoj personalni trener. Hajde da napravimo plan baš za tebe.`,
    emoji: "👋",
  },
  {
    title: "Koji je tvoj cilj?",
    subtitle: "Izaberi ono što ti je najvažnije",
    emoji: "🎯",
    options: ["Mršavljenje", "Toniranje tela", "Više energije", "Zdravlje i pokretljivost"],
  },
  {
    title: "Tvoja fizička forma",
    subtitle: "Budi iskrena — nema pogrešnog odgovora",
    emoji: "💪",
    options: ["Početnica sam", "Treniram povremeno", "Redovno vežbam"],
  },
  {
    title: "Koliko puta nedeljno?",
    subtitle: "Preporučujem 3× za optimalne rezultate",
    emoji: "📅",
    options: ["2× nedeljno", "3× nedeljno", "4× nedeljno", "5× nedeljno"],
  },
  {
    title: "Tvoj plan je spreman!",
    subtitle: "Personalizovan program treninga kreiran na osnovu tvojih odgovora. Hajde da počnemo!",
    emoji: "✨",
  },
];

const WEEK_PLAN = [
  { day: "PON", name: "Noge + gluteus", duration: "35 min", done: true, exercises: [
    { name: "Čučnjevi", sets: "3×12", done: true, video: true },
    { name: "Iskoraci unazad", sets: "3×10", done: true, video: true },
    { name: "Hip thrust", sets: "3×12", done: true, video: true },
    { name: "Rumunsko mrtvo dizanje", sets: "3×10", done: true, video: true },
    { name: "Abdukcije", sets: "3×15", done: true, video: true },
  ]},
  { day: "UTO", name: "Odmor", duration: "", rest: true },
  { day: "SRE", name: "Gornji deo tela", duration: "30 min", done: false, today: true, exercises: [
    { name: "Sklekovi na kolenima", sets: "3×10", done: false, video: true },
    { name: "Veslanje sa gumom", sets: "3×12", done: false, video: true },
    { name: "Lateralna ramena", sets: "3×12", done: false, video: true },
    { name: "Biceps curl", sets: "3×10", done: false, video: true },
    { name: "Triceps dips", sets: "3×10", done: false, video: true },
    { name: "Plank", sets: "3×30s", done: false, video: true },
  ]},
  { day: "ČET", name: "Odmor", duration: "", rest: true },
  { day: "PET", name: "Full body", duration: "40 min", done: false, exercises: [
    { name: "Sumo čučanj", sets: "3×12", done: false, video: true },
    { name: "Push-up to plank", sets: "3×8", done: false, video: true },
    { name: "Kettlebell swing", sets: "3×15", done: false, video: true },
    { name: "Mountain climbers", sets: "3×20", done: false, video: true },
    { name: "Glute bridge", sets: "3×15", done: false, video: true },
    { name: "Plank sa rotacijom", sets: "3×10", done: false, video: true },
    { name: "Stretching", sets: "5 min", done: false, video: true },
  ]},
  { day: "SUB", name: "Odmor", duration: "", rest: true },
  { day: "NED", name: "Odmor", duration: "", rest: true },
];

const TRANSFORMATIONS = [
  { name: "Jelena M.", age: 42, months: 4, desc: "Izgubila 8kg i potpuno promenila odnos prema treningu" },
  { name: "Dragana S.", age: 38, months: 3, desc: "Tonirala telo i dobila energiju koju nije imala godinama" },
  { name: "Milica R.", age: 51, months: 6, desc: "Rešila bolove u leđima i ojačala celo telo" },
  { name: "Ana T.", age: 45, months: 5, desc: "Skinula 12kg i prvi put se oseća sigurno u teretani" },
];

const PACKAGES = [
  { name: "Starter", price: "4.900", duration: "4 nedelje", features: ["Personalizovan plan", "Video za svaku vežbu", "Chat podrška"], popular: false },
  { name: "Transform", price: "11.900", duration: "12 nedelja", features: ["Personalizovan plan", "Video za svaku vežbu", "Chat podrška", "Praćenje napretka", "Nedeljne korekcije"], popular: true },
  { name: "Premium", price: "19.900", duration: "6 meseci", features: ["Sve iz Transform", "Mesečni video poziv", "Prioritetna podrška", "Nutrition vodič"], popular: false },
];

const CHAT_MESSAGES = [
  { from: "trainer", text: "Zdravo! Kako si se osećala posle ponedeljkovog treninga? 😊", time: "09:15" },
  { from: "user", text: "Malo me bole noge ali super sam! 💪", time: "10:22" },
  { from: "trainer", text: "To je potpuno normalno posle treninga nogu! Znači da su mišići radili. Sutra će biti lakše. Samo nastavi ovako! 🙌", time: "10:30" },
  { from: "trainer", text: "Danas imaš gornji deo tela. Fokusiraj se na formu, ne na brzinu. Pošalji mi poruku kad završiš!", time: "14:00" },
];

// ─── Phone Frame ───
function PhoneFrame({ children }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 390,
      margin: "0 auto",
      background: "#1a1a1a",
      borderRadius: 40,
      padding: "12px 10px",
      boxShadow: "0 25px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
    }}>
      <div style={{
        background: C.bg,
        borderRadius: 32,
        overflow: "hidden",
        height: 780,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{
          height: 48,
          background: C.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          fontSize: 13,
          fontWeight: 500,
          color: C.text,
          flexShrink: 0,
        }}>
          <span>9:41</span>
          <div style={{ width: 100, height: 28, background: "#1a1a1a", borderRadius: 14 }} />
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ width: 16, height: 10, border: `1.5px solid ${C.text}`, borderRadius: 2, position: "relative" }}>
              <div style={{ width: 10, height: 6, background: C.text, borderRadius: 1, position: "absolute", left: 1.5, top: 1 }} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Tab Bar ───
function TabBar({ tabs, active, onTab, isPaid }) {
  return (
    <div style={{
      display: "flex",
      borderTop: `1px solid ${C.border}`,
      background: C.card,
      flexShrink: 0,
      paddingBottom: 16,
      paddingTop: 6,
    }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            background: "none",
            border: "none",
            padding: "6px 0",
            cursor: "pointer",
            color: active === t.id ? C.primary : C.muted,
            transition: "color 0.2s",
            position: "relative",
          }}
        >
          {t.locked && (
            <div style={{ position: "absolute", top: 2, right: "calc(50% - 18px)", color: C.muted, opacity: 0.6 }}>
              {Icons.lock}
            </div>
          )}
          <div style={{ opacity: t.locked ? 0.4 : 1 }}>{t.icon}</div>
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 600 : 400, opacity: t.locked ? 0.4 : 1 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Screens ───

function SplashScreen({ onNext }) {
  useEffect(() => { const t = setTimeout(onNext, 2000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(160deg, ${C.primaryLight} 0%, ${C.bg} 50%, ${C.accentLight} 100%)`,
    }}>
      <div style={{ fontSize: 48, fontWeight: 700, color: C.primary, letterSpacing: -2, fontFamily: "Georgia, serif" }}>{APP_NAME}</div>
      <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 8, letterSpacing: 3, textTransform: "uppercase" }}>by {TRAINER_NAME}</div>
      <div style={{
        marginTop: 48,
        width: 32,
        height: 32,
        border: `2.5px solid ${C.border}`,
        borderTopColor: C.primary,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 4, padding: "8px 20px" }}>
        {ONBOARDING_STEPS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= step ? C.primary : C.border,
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px" }}>
        <div style={{ fontSize: 52, marginBottom: 20, textAlign: "center" }}>{current.emoji}</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, textAlign: "center", margin: "0 0 12px", lineHeight: 1.2, fontFamily: "Georgia, serif" }}>{current.title}</h1>
        <p style={{ fontSize: 15, color: C.textSecondary, textAlign: "center", margin: "0 0 32px", lineHeight: 1.5 }}>{current.subtitle}</p>

        {current.options && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelections({ ...selections, [step]: opt })}
                style={{
                  padding: "15px 20px",
                  borderRadius: 14,
                  border: selections[step] === opt ? `2px solid ${C.primary}` : `1.5px solid ${C.border}`,
                  background: selections[step] === opt ? C.primaryLight : C.card,
                  color: selections[step] === opt ? C.primaryDark : C.text,
                  fontSize: 15,
                  fontWeight: selections[step] === opt ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: "20px 28px 28px", display: "flex", gap: 12 }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{
            padding: "14px 20px", borderRadius: 14, border: `1.5px solid ${C.border}`,
            background: C.card, color: C.textSecondary, fontSize: 15, fontWeight: 500, cursor: "pointer",
          }}>Nazad</button>
        )}
        <button
          onClick={() => isLast ? onComplete() : setStep(step + 1)}
          disabled={current.options && !selections[step]}
          style={{
            flex: 1, padding: "14px 20px", borderRadius: 14, border: "none",
            background: (current.options && !selections[step]) ? C.border : C.primary,
            color: (current.options && !selections[step]) ? C.muted : "#fff",
            fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          }}
        >{isLast ? "Započni" : "Nastavi"}</button>
      </div>
    </div>
  );
}

function HomeFreePage({ onGoToTrainer, onGoToPackages }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{ fontSize: 13, color: C.textSecondary }}>Zdravo! 👋</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Dobrodošla u {APP_NAME}</div>
      </div>

      {/* Free mini workout */}
      <div style={{ margin: "12px 20px", padding: "20px", borderRadius: 16, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`, color: "#fff" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.8, marginBottom: 6 }}>Besplatan trening</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>7-minutni jutarnji trening</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>Probaj kako izgleda trening sa mnom</div>
        <button style={{
          background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)",
          color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}>
          {Icons.play} &nbsp;Započni
        </button>
      </div>

      {/* Daily tip */}
      <div style={{ margin: "8px 20px", padding: "16px 18px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: C.primary, fontWeight: 600, marginBottom: 6 }}>Savet dana</div>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.5 }}>"Hidracija je ključ! Pij čašu vode odmah ujutru pre svega ostalog — tvoje telo će ti biti zahvalno." — Maja</div>
      </div>

      {/* Program preview */}
      <div style={{ margin: "8px 20px", padding: "18px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 12 }}>Tvoj program</div>
        {["Noge + gluteus", "Gornji deo tela", "Full body"].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none",
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{item}</div>
              <div style={{ fontSize: 12, color: C.muted }}>30-40 min</div>
            </div>
            <div style={{ color: C.muted, opacity: 0.5 }}>{Icons.lock}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ margin: "16px 20px 20px" }}>
        <button onClick={onGoToPackages} style={{
          width: "100%", padding: "16px", borderRadius: 14, border: "none",
          background: C.primary, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer",
        }}>Otključaj puni program</button>
      </div>
    </div>
  );
}

function TrainerPage() {
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      {/* Hero */}
      <div style={{
        height: 200, background: `linear-gradient(160deg, ${C.primaryLight} 0%, ${C.highlight} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%", background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, color: "#fff", fontWeight: 700, fontFamily: "Georgia, serif",
          border: "4px solid #fff", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        }}>MP</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginTop: 10, fontFamily: "Georgia, serif" }}>{TRAINER_NAME}</div>
        <div style={{ fontSize: 13, color: C.textSecondary }}>Personalni trener • 8 god. iskustva</div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Bio */}
        <div style={{ padding: "16px 18px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 8 }}>Moja priča</div>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>
            Počela sam da treniram sa 25 godina kada sam i sama imala problema sa viškom kilograma. Danas, nakon 8 godina rada sa preko 200 klijentkinja, moja misija je da svaka žena otkrije koliko je zapravo jaka. Specijalizovana sam za rad sa ženama srednjih godina.
          </p>
        </div>

        {/* Credentials */}
        <div style={{ padding: "16px 18px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 10 }}>Sertifikati</div>
          {["ACE Certified Personal Trainer", "Nutrition Coach — Precision Nutrition", "Corrective Exercise Specialist"].map((cert, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 13, color: C.textSecondary }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: C.success, flexShrink: 0 }} />
              {cert}
            </div>
          ))}
        </div>

        {/* Transformations */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 10 }}>Rezultati klijentkinja</div>
          {TRANSFORMATIONS.map((t, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: 14, background: C.card,
              border: `1px solid ${C.border}`, marginBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}, {t.age} god.</div>
                <div style={{ fontSize: 11, color: C.success, fontWeight: 600, background: C.successLight, padding: "3px 8px", borderRadius: 6 }}>{t.months} meseca</div>
              </div>
              <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.4 }}>{t.desc}</div>
              {/* Placeholder for before/after */}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <div style={{ flex: 1, height: 70, borderRadius: 8, background: C.borderLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.muted }}>Pre</div>
                <div style={{ flex: 1, height: 70, borderRadius: 8, background: C.successLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.success }}>Posle</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ padding: "16px 18px", borderRadius: 14, background: C.primaryLight, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#D4A84B" }}>{Icons.star}</span>)}
          </div>
          <p style={{ fontSize: 13, color: C.primaryDark, lineHeight: 1.5, margin: "0 0 8px", fontStyle: "italic" }}>
            "Maja je promenila moj život. Sa 47 godina sam u boljoj formi nego sa 30. Treninzi su prilagođeni baš meni i uvek je tu kad mi treba."
          </p>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>— Snežana K., 47</div>
        </div>
      </div>
    </div>
  );
}

function PackagesPage({ onBuy }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Izaberi svoj paket</div>
        <div style={{ fontSize: 14, color: C.textSecondary, marginTop: 4 }}>Jednokratna kupovina, bez pretplate</div>
      </div>

      <div style={{ padding: "12px 20px" }}>
        {PACKAGES.map((pkg, i) => (
          <div key={i} style={{
            padding: "20px 18px", borderRadius: 16, background: C.card, marginBottom: 12,
            border: pkg.popular ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
            position: "relative",
          }}>
            {pkg.popular && (
              <div style={{
                position: "absolute", top: -10, left: 18,
                background: C.primary, color: "#fff", fontSize: 11, fontWeight: 600,
                padding: "3px 12px", borderRadius: 8, letterSpacing: 0.5,
              }}>Najpopularnije</div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{pkg.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{pkg.duration}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.primary, marginBottom: 12 }}>
              {pkg.price} <span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>RSD</span>
            </div>
            {pkg.features.map((f, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: C.textSecondary }}>
                <span style={{ color: C.success }}>{Icons.check}</span> {f}
              </div>
            ))}
            <button onClick={onBuy} style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none", marginTop: 14,
              background: pkg.popular ? C.primary : C.primaryLight,
              color: pkg.popular ? "#fff" : C.primaryDark,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}>Izaberi {pkg.name}</button>
          </div>
        ))}

        {/* FAQ */}
        <div style={{ padding: "16px 18px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 10 }}>Česta pitanja</div>
          {[
            ["Da li mogu da treniram kod kuće?", "Da! Svi treninzi su prilagođeni za trening kod kuće sa minimalnom opremom."],
            ["Šta ako mi je trening pretežak?", "Svaka vežba ima lakšu alternativu. Plus, u chatu možeš da pitaš za prilagođavanje."],
            ["Da li ima rok trajanja?", "Ne! Kupljeni paket je tvoj zauvek, bez vremenskog ograničenja."],
          ].map(([q, a], i) => (
            <div key={i} style={{ padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{q}</div>
              <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.4 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Paid screens ───

function HomePaidPage({ onStartWorkout }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 20px 4px" }}>
        <div style={{ fontSize: 13, color: C.textSecondary }}>Sreda, 15. mart</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Zdravo! 💪</div>
      </div>

      {/* Streak */}
      <div style={{ display: "flex", gap: 10, padding: "10px 20px" }}>
        <div style={{ flex: 1, padding: "14px", borderRadius: 12, background: C.accentLight, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.accent }}>{Icons.fire} 5</div>
          <div style={{ fontSize: 11, color: C.accent, marginTop: 2 }}>dana zaredom</div>
        </div>
        <div style={{ flex: 1, padding: "14px", borderRadius: 12, background: C.successLight, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.success }}>12</div>
          <div style={{ fontSize: 11, color: C.success, marginTop: 2 }}>treninga ovog meseca</div>
        </div>
      </div>

      {/* Today's workout */}
      <div style={{
        margin: "8px 20px", padding: "20px 18px", borderRadius: 16, color: "#fff",
        backgroundImage: `linear-gradient(to right, rgba(44,42,38,0.85) 0%, rgba(44,42,38,0.55) 60%, rgba(44,42,38,0.25) 100%), url(${HERO_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center top",
        minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.8 }}>Današnji trening</div>
        <div style={{ fontSize: 20, fontWeight: 700, margin: "6px 0 2px", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Gornji deo tela</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>6 vežbi • 30 min</div>
        <button onClick={onStartWorkout} style={{
          background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.5)",
          color: "#fff", padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
          backdropFilter: "blur(4px)", alignSelf: "flex-start",
        }}>Započni trening →</button>
      </div>

      {/* Trainer note */}
      <div style={{ margin: "8px 20px", padding: "14px 16px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, color: C.primary, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Poruka od Maje</div>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.5 }}>"Danas se fokusiraj na kontrolisan pokret. Bolje je raditi sporije sa pravilnom formom nego brzo i neprecizno!" 🎯</div>
      </div>

      {/* Week overview */}
      <div style={{ margin: "8px 20px 20px", padding: "16px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 10 }}>Ova nedelja</div>
        <div style={{ display: "flex", gap: 4 }}>
          {WEEK_PLAN.map((d, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8,
              background: d.today ? C.primaryLight : d.done ? C.successLight : d.rest ? C.bg : "transparent",
              border: d.today ? `1.5px solid ${C.primary}` : "1.5px solid transparent",
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: d.today ? C.primary : C.muted }}>{d.day}</div>
              <div style={{ marginTop: 4 }}>
                {d.done ? <span style={{ color: C.success, fontSize: 14 }}>✓</span>
                  : d.rest ? <span style={{ fontSize: 10, color: C.muted }}>—</span>
                  : d.today ? <span style={{ width: 8, height: 8, borderRadius: 4, background: C.primary, display: "inline-block" }} />
                  : <span style={{ width: 8, height: 8, borderRadius: 4, background: C.border, display: "inline-block" }} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkoutsPage({ onStartWorkout, onOpenExercise }) {
  const [view, setView] = useState("plan");
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Treninzi</div>
        <div style={{ display: "flex", background: C.borderLight, borderRadius: 8, padding: 2 }}>
          {["plan", "kalendar"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: view === v ? C.card : "transparent", color: view === v ? C.text : C.muted,
              boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>{v === "plan" ? "Plan" : "Kalendar"}</button>
          ))}
        </div>
      </div>

      {view === "plan" ? (
        <div style={{ padding: "8px 20px 20px" }}>
          {WEEK_PLAN.map((d, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: 14, marginBottom: 8,
              background: d.today ? C.card : d.rest ? C.bg : C.card,
              border: d.today ? `2px solid ${C.primary}` : `1px solid ${d.rest ? C.borderLight : C.border}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: d.today ? C.primary : C.muted, minWidth: 30 }}>{d.day}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: d.rest ? C.muted : C.text }}>{d.name}</span>
                    {d.today && <span style={{ fontSize: 10, background: C.primaryLight, color: C.primary, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>DANAS</span>}
                  </div>
                  {d.duration && <div style={{ fontSize: 12, color: C.muted, marginTop: 2, marginLeft: 38 }}>{d.duration} • {d.exercises?.length} vežbi</div>}
                  {d.rest && <div style={{ fontSize: 12, color: C.muted, marginTop: 2, marginLeft: 38 }}>Tvoje telo se regeneriše 🧘‍♀️</div>}
                </div>
                {d.done && <span style={{ color: C.success }}>{Icons.check}</span>}
              </div>
              {d.today && (
                <button onClick={onStartWorkout} style={{
                  width: "100%", padding: "11px", borderRadius: 10, border: "none", marginTop: 12,
                  background: C.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>Započni trening →</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Calendar view */
        <div style={{ padding: "8px 20px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.text, textAlign: "center", marginBottom: 14 }}>Mart 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center" }}>
            {["P","U","S","Č","P","S","N"].map(d => (
              <div key={d} style={{ fontSize: 11, color: C.muted, fontWeight: 600, padding: "4px 0" }}>{d}</div>
            ))}
            {Array.from({length: 42}, (_, i) => {
              const day = i - 5;
              if (day < 1 || day > 31) return <div key={i} />;
              const done = [2, 4, 6, 9, 11, 13].includes(day);
              const rest = [1, 3, 5, 7, 8, 10, 12, 14].includes(day) && !done;
              const today = day === 15;
              const future = day > 15;
              return (
                <div key={i} style={{
                  padding: "6px 0", borderRadius: 8, fontSize: 13,
                  background: today ? C.primaryLight : "transparent",
                  color: future ? C.muted : today ? C.primary : C.text,
                  fontWeight: today ? 700 : 400,
                  position: "relative",
                }}>
                  {day}
                  {done && <div style={{ width: 5, height: 5, borderRadius: 3, background: C.success, margin: "2px auto 0" }} />}
                  {today && <div style={{ width: 5, height: 5, borderRadius: 3, background: C.primary, margin: "2px auto 0" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, fontSize: 11, color: C.muted }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: C.success }} /> Odrađeno</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: C.primary }} /> Danas</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveWorkoutPage({ workout, onBack, onComplete }) {
  const [checked, setChecked] = useState(workout.exercises.map(e => e.done));
  const [showVideo, setShowVideo] = useState(null);
  const allDone = checked.every(Boolean);
  const doneCount = checked.filter(Boolean).length;

  if (showVideo !== null) {
    const ex = workout.exercises[showVideo];
    return (
      <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
        <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setShowVideo(null)} style={{ background: "none", border: "none", cursor: "pointer", color: C.text, padding: 4 }}>{Icons.back}</button>
          <span style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{ex.name}</span>
        </div>
        {/* Video placeholder */}
        <div style={{
          margin: "0 20px", height: 200, borderRadius: 14, background: "#1a1a1a",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            {Icons.play}
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Serije × ponavljanja</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.primary }}>{ex.sets}</div>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>Tehnika</div>
            <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>Drži leđa ravno, kolena u liniji sa prstima. Kontrolisan pokret nadole, eksplozivan nagore.</div>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: C.primaryLight }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.primaryDark, marginBottom: 4 }}>💡 Tips od Maje</div>
            <div style={{ fontSize: 13, color: C.primaryDark, lineHeight: 1.5 }}>Ako ti je teško, smanji opseg pokreta. Bitnije je da radiš pravilno nego duboko!</div>
          </div>
          <button style={{
            width: "100%", padding: "13px", borderRadius: 12, border: `1.5px solid ${C.border}`,
            background: C.card, color: C.textSecondary, fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 12,
          }}>Zameni alternativnom vežbom</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: C.text, padding: 4 }}>{Icons.back}</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{workout.name}</div>
          <div style={{ fontSize: 12, color: C.muted }}>{workout.duration} • {workout.exercises.length} vežbi</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 20px 8px", flexShrink: 0 }}>
        <div style={{ height: 4, borderRadius: 2, background: C.border }}>
          <div style={{ height: 4, borderRadius: 2, background: C.success, width: `${(doneCount / checked.length) * 100}%`, transition: "width 0.4s" }} />
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{doneCount}/{checked.length} vežbi odrađeno</div>
      </div>

      {/* Exercise list */}
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 20px" }}>
        {workout.exercises.map((ex, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 14px", borderRadius: 12, marginBottom: 6,
            background: checked[i] ? C.successLight : C.card,
            border: `1px solid ${checked[i] ? "transparent" : C.border}`,
            opacity: checked[i] ? 0.7 : 1, transition: "all 0.3s",
          }}>
            <button
              onClick={() => { const n = [...checked]; n[i] = !n[i]; setChecked(n); }}
              style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0, cursor: "pointer",
                border: checked[i] ? "none" : `2px solid ${C.border}`,
                background: checked[i] ? C.success : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", transition: "all 0.2s",
              }}
            >
              {checked[i] && Icons.check}
            </button>
            <div style={{ flex: 1 }} onClick={() => setShowVideo(i)}>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, textDecoration: checked[i] ? "line-through" : "none" }}>{ex.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{ex.sets}</div>
            </div>
            <button onClick={() => setShowVideo(i)} style={{
              background: C.primaryLight, border: "none", borderRadius: 8, padding: "6px 8px",
              cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600,
            }}>
              {Icons.play} Video
            </button>
          </div>
        ))}
      </div>

      {/* Complete button */}
      {allDone && (
        <div style={{ padding: "12px 20px 20px", flexShrink: 0 }}>
          <button onClick={onComplete} style={{
            width: "100%", padding: "15px", borderRadius: 14, border: "none",
            background: C.success, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
          }}>Završi trening! 🎉</button>
        </div>
      )}
    </div>
  );
}

function CompletionPage({ onClose }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(160deg, ${C.successLight} 0%, ${C.bg} 60%)`, padding: 28,
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, textAlign: "center", fontFamily: "Georgia, serif" }}>Svaka čast!</div>
      <div style={{ fontSize: 15, color: C.textSecondary, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>Trening je završen. Ti si neuništiva!</div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <div style={{ padding: "16px 20px", borderRadius: 14, background: C.card, textAlign: "center", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.accent }}>{Icons.fire} 6</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Streak dana</div>
        </div>
        <div style={{ padding: "16px 20px", borderRadius: 14, background: C.card, textAlign: "center", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.primary }}>32m</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Trajanje</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24, width: "100%" }}>
        {[1,2,3,4,5].map(n => (
          <button key={n} style={{
            flex: 1, padding: "12px 0", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.card,
            fontSize: 13, color: C.textSecondary, cursor: "pointer", textAlign: "center",
          }}>
            {n === 1 ? "😩" : n === 2 ? "😅" : n === 3 ? "💪" : n === 4 ? "😊" : "🔥"}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>Kako ti je bio trening?</div>

      <button style={{
        width: "100%", padding: "14px", borderRadius: 14, border: "none", marginTop: 24,
        background: C.primary, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
      }}>Podeli sa trenerom 💬</button>
      <button onClick={onClose} style={{
        width: "100%", padding: "14px", borderRadius: 14, border: `1.5px solid ${C.border}`, marginTop: 8,
        background: C.card, color: C.textSecondary, fontSize: 15, fontWeight: 500, cursor: "pointer",
      }}>Zatvori</button>
    </div>
  );
}

function ProgressPage() {
  const measurements = [
    { label: "Težina", value: "72.5 kg", change: "-2.3", good: true },
    { label: "Obim struka", value: "78 cm", change: "-4", good: true },
    { label: "Obim kukova", value: "101 cm", change: "-2", good: true },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Napredak</div>
      </div>
      <div style={{ padding: "8px 20px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {measurements.map((m, i) => (
            <div key={i} style={{ padding: "14px 10px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.muted }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "4px 0" }}>{m.value}</div>
              <div style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>{m.change} cm</div>
            </div>
          ))}
        </div>

        {/* Mini chart placeholder */}
        <div style={{ padding: "16px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>Težina — poslednja 4 nedelje</div>
          <div style={{ height: 100, display: "flex", alignItems: "flex-end", gap: 6, padding: "0 8px" }}>
            {[74.8, 74.2, 73.5, 72.5].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 10, color: C.muted }}>{v}</div>
                <div style={{ width: "100%", height: `${(v - 70) * 18}px`, borderRadius: 6, background: i === 3 ? C.primary : C.primaryLight, transition: "height 0.3s" }} />
                <div style={{ fontSize: 10, color: C.muted }}>N{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo diary */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 10 }}>Foto dnevnik</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["1. mart", "8. mart", "15. mart"].map((d, i) => (
              <div key={i} style={{
                height: 100, borderRadius: 12, background: i === 2 ? C.primaryLight : C.borderLight,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: i === 2 ? `1.5px dashed ${C.primary}` : "none",
              }}>
                {i === 2 ? (
                  <>
                    <span style={{ color: C.primary }}>{Icons.image}</span>
                    <span style={{ fontSize: 10, color: C.primary, marginTop: 4 }}>Dodaj</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 10, color: C.muted }}>{d}</span>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.border, marginTop: 6 }} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div style={{ padding: "16px", borderRadius: 14, background: C.accentLight, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28 }}>{Icons.fire}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>5 dana zaredom!</div>
              <div style={{ fontSize: 12, color: C.accent }}>Još 2 dana do novog ličnog rekorda</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 600 }}>MP</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{TRAINER_NAME}</div>
          <div style={{ fontSize: 11, color: C.success }}>Online</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px", borderRadius: 16,
              background: m.from === "user" ? C.primary : C.card,
              color: m.from === "user" ? "#fff" : C.text,
              border: m.from === "user" ? "none" : `1px solid ${C.border}`,
              borderBottomRightRadius: m.from === "user" ? 4 : 16,
              borderBottomLeftRadius: m.from === "user" ? 16 : 4,
            }}>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
              <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6, textAlign: "right" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "10px 16px 20px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, flexShrink: 0 }}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Napiši poruku..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`,
            background: C.card, fontSize: 14, color: C.text, outline: "none",
          }}
        />
        <button
          onClick={() => { if (msg.trim()) { setMessages([...messages, { from: "user", text: msg, time: "Sada" }]); setMsg(""); } }}
          style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: C.primary, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >{Icons.send}</button>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600, color: C.primary }}>TK</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Tamara Kovačević</div>
          <div style={{ fontSize: 13, color: C.muted }}>Transform paket • Aktivno</div>
        </div>
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        {[
          { label: "Moj profil", desc: "Lični podaci i ciljevi" },
          { label: "Podešavanja", desc: "Notifikacije, podsetnici" },
          { label: "Nutrition vodič", desc: "Uskoro dostupno", soon: true },
          { label: "Podrška", desc: "Pomoć i kontakt" },
          { label: "Politika privatnosti", desc: "" },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "14px 0", borderBottom: `1px solid ${C.borderLight}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{item.label}</div>
              {item.desc && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.desc}</div>}
            </div>
            {item.soon ? (
              <span style={{ fontSize: 10, background: C.primaryLight, color: C.primary, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>USKORO</span>
            ) : (
              <span style={{ color: C.muted, fontSize: 18 }}>›</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── Main App ───
export default function FitnessApp() {
  const [screen, setScreen] = useState("splash");
  const [isPaid, setIsPaid] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const freeTabs = [
    { id: "home", label: "Početna", icon: Icons.home },
    { id: "trainer", label: "O treneru", icon: Icons.trainer },
    { id: "packages", label: "Paketi", icon: Icons.packages },
  ];

  const paidTabs = [
    { id: "home", label: "Početna", icon: Icons.home },
    { id: "workouts", label: "Treninzi", icon: Icons.workout },
    { id: "progress", label: "Napredak", icon: Icons.progress },
    { id: "chat", label: "Chat", icon: Icons.chat },
    { id: "profile", label: "Profil", icon: Icons.profile },
  ];

  const handleBuy = () => {
    setIsPaid(true);
    setActiveTab("home");
  };

  const handleStartWorkout = () => {
    const todayWorkout = WEEK_PLAN.find(d => d.today);
    if (todayWorkout) {
      setActiveWorkout(todayWorkout);
    }
  };

  if (screen === "splash") return <PhoneFrame><SplashScreen onNext={() => setScreen("onboarding")} /></PhoneFrame>;
  if (screen === "onboarding") return <PhoneFrame><OnboardingScreen onComplete={() => setScreen("app")} /></PhoneFrame>;

  // Main app
  const tabs = isPaid ? paidTabs : freeTabs;

  const renderContent = () => {
    if (showCompletion) return <CompletionPage onClose={() => { setShowCompletion(false); setActiveWorkout(null); }} />;
    if (activeWorkout) return <ActiveWorkoutPage workout={activeWorkout} onBack={() => setActiveWorkout(null)} onComplete={() => setShowCompletion(true)} />;

    if (!isPaid) {
      if (activeTab === "home") return <HomeFreePage onGoToTrainer={() => setActiveTab("trainer")} onGoToPackages={() => setActiveTab("packages")} />;
      if (activeTab === "trainer") return <TrainerPage />;
      if (activeTab === "packages") return <PackagesPage onBuy={handleBuy} />;
    } else {
      if (activeTab === "home") return <HomePaidPage onStartWorkout={handleStartWorkout} />;
      if (activeTab === "workouts") return <WorkoutsPage onStartWorkout={handleStartWorkout} />;
      if (activeTab === "progress") return <ProgressPage />;
      if (activeTab === "chat") return <ChatPage />;
      if (activeTab === "profile") return <ProfilePage />;
    }
  };

  return (
    <PhoneFrame>
      {renderContent()}
      {!activeWorkout && !showCompletion && (
        <TabBar tabs={tabs} active={activeTab} onTab={setActiveTab} isPaid={isPaid} />
      )}
    </PhoneFrame>
  );
}
