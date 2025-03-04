import { RendererModel } from '../..'
import { buildTFoots } from './buildTFoots'

interface Model {
  coding: number;
  communication: number;
  design: number;
  impact: number;
  lead: number;
}

describe('buildTFoots', () => {
  test('All Column has foot', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        foot: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        foot: () => 'lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(5)
    tfoots!.forEach(foot => {
      expect(foot.colSpan).toBe(1)
    })

    const [CODING, COMMUNICATION, DESIGN, IMPACT, LEAD] = tfoots!

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('First column have no foot, so we need to fill one head', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        foot: () => 'lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(5)

    const [first, ...rest] = tfoots!

    expect(first.colSpan).toBe(1)
    rest!.forEach(foot => {
      expect(foot.colSpan).toBe(1)
    })

    const [COMMUNICATION, DESIGN, IMPACT, LEAD] = rest

    expect(first.value).toBeNull()
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('First and Second column have no foot, so we need to fill two head', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        foot: () => 'lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(4)

    const [first, ...rest] = tfoots!

    expect(first.colSpan).toBe(2)

    rest.forEach(foot => {
      expect(foot.colSpan).toBe(1)
    })

    const [DESIGN, IMPACT, LEAD] = rest

    expect(first.value).toBeNull()
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('Last column have no foot, so we need to fill one tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        foot: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(5)

    const [CODING, COMMUNICATION, DESIGN, IMPACT, last] = tfoots!

    ;[CODING, COMMUNICATION, DESIGN, IMPACT].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(last.colSpan).toBe(1)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(last.value).toBeNull()
  })

  test('Last two column have no foot, so we need to fill two tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        foot: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(4)

    const [CODING, COMMUNICATION, DESIGN, last] = tfoots!

    ;[CODING, COMMUNICATION, DESIGN].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(last.colSpan).toBe(2)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(last.value).toBeNull()
  })

  test('First and Last column have no foot, so we need to fill one head, one tail', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
      },
      {
        accessor: 'design',
        label: 'Design',
        foot: () => 'design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(5)

    const [first, COMMUNICATION, DESIGN, IMPACT, last] = tfoots!

    ;[COMMUNICATION, DESIGN, IMPACT].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(first.colSpan).toBe(1)
    expect(last.colSpan).toBe(1)

    expect(first.value).toBeNull()
    expect(COMMUNICATION.value).toBe('Communication')
    expect(DESIGN.value).toBe('Design')
    expect(IMPACT.value).toBe('Impact')
    expect(last.value).toBeNull()
  })

  test('The Middle Column have no foot, so check previous column config - extends', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        foot: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
        rules: {
          extendsFoot: true,
        },
      },
      {
        accessor: 'design',
        label: 'Design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        foot: () => 'lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(4)

    const [CODING, COMMUNICATION, IMPACT, LEAD] = tfoots!

    ;[CODING, IMPACT, LEAD].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(COMMUNICATION.colSpan).toBe(2)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('The Middle Column have no foot, so check previous column config - extends', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
        foot: () => 'coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
        foot: () => 'communication',
        rules: {
          extendsFoot: false,
        },
      },
      {
        accessor: 'design',
        label: 'Design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
        foot: () => 'impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
        foot: () => 'lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(5)

    const [CODING, COMMUNICATION, empty, IMPACT, LEAD] = tfoots!

    ;[CODING, COMMUNICATION, IMPACT, LEAD].forEach(target => {
      expect(target.colSpan).toBe(1)
    })
    expect(empty.colSpan).toBe(1)

    expect(CODING.value).toBe('Coding')
    expect(COMMUNICATION.value).toBe('Communication')
    expect(empty.value).toBeNull()
    expect(IMPACT.value).toBe('Impact')
    expect(LEAD.value).toBe('Lead')
  })

  test('No column have foot', () => {
    const model: RendererModel<Model> = [
      {
        accessor: 'coding',
        label: 'Coding',
      },
      {
        accessor: 'communication',
        label: 'Communication',
      },
      {
        accessor: 'design',
        label: 'Design',
      },
      {
        accessor: 'impact',
        label: 'Impact',
      },
      {
        accessor: 'lead',
        label: 'Lead',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots).toBeNull()
  })

  test('All Column has foot', () => {
    const model: RendererModel<{ web: string; mobile: string}> = [
      {
        accessor: [
          {
            accessor: 'web',
            label: 'Web',
            foot: () => 'Web',
          },
          {
            accessor: 'mobile',
            label: 'Mobile',
            foot: () => 'Mobile',
          },
        ],
        label: 'Coding',
        foot: () => 'coding',
      },
    ]
    const { tfoots } = buildTFoots(model)

    expect(tfoots!.length).toBe(2)
    tfoots!.forEach(foot => {
      expect(foot.colSpan).toBe(1)
    })

    const [WEB, MOBILE] = tfoots!

    expect(WEB.value).toBe('Web')
    expect(MOBILE.value).toBe('Mobile')
  })
})
