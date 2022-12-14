const user = {};

const initialExercisesDB = [
  {
    name: "Supino reto barra",
    videoUrl: "https://www.youtube.com/watch?v=sqOw2Y6uDWQ",
    type: "Chest",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Supino inclinado halteres",
    videoUrl: "https://www.youtube.com/watch?v=Z1rCZ0YHrP0",
    type: "Chest",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Crucifixo no Crossover",
    videoUrl: "https://www.youtube.com/watch?v=o90Pm6qTeNI",
    type: "Chest",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Peito na Barra Paralela",
    videoUrl: "https://www.youtube.com/watch?v=vEjRJoitR4c",
    type: "Chest",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Tríceps pulley corda",
    videoUrl: "https://www.youtube.com/watch?v=_KrR8248eLo",
    type: "Triceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Tríceps coice unilateral",
    videoUrl: "https://www.youtube.com/watch?v=MGlqvfSCWLQ",
    type: "Triceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Rosca testa pronada",
    videoUrl: "https://www.youtube.com/watch?v=orMEOzQjiAs",
    type: "Triceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Puxada vertical pronada",
    videoUrl: "https://www.youtube.com/watch?v=H09EvebBsB4",
    type: "Back",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Barra fixa pronada",
    videoUrl: "https://www.youtube.com/watch?v=JX_YM7Bp26U",
    type: "Back",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Remada curvada",
    videoUrl: "https://www.youtube.com/watch?v=XruycmUNi1Y",
    type: "Back",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Pulldown",
    videoUrl: "https://www.youtube.com/watch?v=EG1ua8lDQJA",
    type: "Back",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Rosca direta barra",
    videoUrl: "https://www.youtube.com/watch?v=po8ibB0yY0Q",
    type: "Biceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Rosca alternada inclinada",
    videoUrl: "https://www.youtube.com/watch?v=mUEDnCGrNP4",
    type: "Biceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Rosca martelo cross",
    videoUrl: "https://www.youtube.com/watch?v=TXYeSl2QT50",
    type: "Biceps",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Elevação lateral halter",
    videoUrl: "https://www.youtube.com/watch?v=89K5H0Vvhnw",
    type: "Shoulder",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Desenvolvimento máquina",
    videoUrl: "https://www.youtube.com/watch?v=oBF4YIwh_w8",
    type: "Shoulder",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Elevação frontal barra",
    videoUrl: "https://www.youtube.com/watch?v=jXUIrrvlR_0",
    type: "Shoulder",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Agachamento livre",
    videoUrl: "https://www.youtube.com/watch?v=4TG8JdU6NPU",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Flexão de perna",
    videoUrl: "https://www.youtube.com/watch?v=qCcu6WAQ5Ls",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Leg press 45",
    videoUrl: "https://www.youtube.com/watch?v=kyESFAj3W0E",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Gemeos leg press",
    videoUrl: "https://www.youtube.com/watch?v=omdVB4rQnoQ",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Cadeira adutora",
    videoUrl: "https://www.youtube.com/watch?v=UB5qna8tQkw",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Cadeira abdultora",
    videoUrl: "https://www.youtube.com/watch?v=yVZ0Vs7j6EM",
    type: "Leg",
    liked: "true",
    owner: user._id,
  },
  {
    name: "Triceps testa",
    videoUrl: "https://www.youtube.com/watch?v=oqob5MHbzBc",
    type: "Triceps",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Triceps francês bilateral",
    videoUrl: "https://www.youtube.com/watch?v=U9REU8VoNww",
    type: "Triceps",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Fly inclinado",
    videoUrl: "https://www.youtube.com/watch?v=U9REU8VoNww",
    type: "Chest",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Supino declinado halter",
    videoUrl: "https://www.youtube.com/watch?v=ifWEwZDWMAw",
    type: "Chest",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Encolhimento de ombros halter",
    videoUrl: "www.youtube.com/watch?v=YeILDnoeYEk",
    type: "Shoulder",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Elevação frontal  halter",
    videoUrl: "https://www.youtube.com/watch?v=jhxLYSm_P-k",
    type: "Shoulder",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Remada cavalinho",
    videoUrl: "https://www.youtube.com/watch?v=peMVFQE1BfY",
    type: "Back",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Fly inverso",
    videoUrl: "https://www.youtube.com/watch?v=GF-m9M_fm68",
    type: "Back",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Rosca concentrada unilateral",
    videoUrl: "https://www.youtube.com/watch?v=PcwdHVhWY3s",
    type: "Biceps",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Rosca direta barra W",
    videoUrl: "https://www.youtube.com/watch?v=V6UEDzY51gY",
    type: "Biceps",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Extensão de perna",
    videoUrl: "https://www.youtube.com/watch?v=LkVnLJKUYwE",
    type: "Leg",
    liked: "false",
    owner: user._id,
  },
  {
    name: "Stiff barra",
    videoUrl: "https://www.youtube.com/watch?v=Xgql23RkpBk",
    type: "Leg",
    liked: "false",
    owner: user._id,
  },
];

module.exports = { initialExercisesDB };
