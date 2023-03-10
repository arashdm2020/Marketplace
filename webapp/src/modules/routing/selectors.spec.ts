import { Rarity } from '@dcl/schemas'
import { AssetType } from '../asset/types'
import { WearableGender } from '../nft/wearable/types'
import { VendorName } from '../vendor'
import { locations } from './locations'
import {
  getAssetType,
  getIsMap,
  getOnlyOnRent,
  getSection,
  hasFiltersEnabled
} from './selectors'
import { Sections } from './types'

describe('when getting if the are filters set', () => {
  describe('when the network filter is set', () => {
    it('should return true', () => {
      expect(hasFiltersEnabled.resultFunc('aNetwork', [], [], [])).toBe(true)
    })
  })

  describe('when the genders filter is set', () => {
    it('should return true', () => {
      expect(
        hasFiltersEnabled.resultFunc(undefined, [WearableGender.FEMALE], [], [])
      ).toBe(true)
    })
  })

  describe('when the rarities filter is set', () => {
    it('should return true', () => {
      expect(
        hasFiltersEnabled.resultFunc(undefined, [], [Rarity.COMMON], [])
      ).toBe(true)
    })
  })

  describe('when the contracts filter is set', () => {
    it('should return true', () => {
      expect(hasFiltersEnabled.resultFunc(undefined, [], [], ['0x.....'])).toBe(
        true
      )
    })
  })

  describe('when the network, the genders, the rarities and the contracts filters is not set', () => {
    it('should return false', () => {
      expect(hasFiltersEnabled.resultFunc(undefined, [], [], [])).toBe(false)
    })
  })
})

describe('when getting the section', () => {
  describe("when there's no section URL param and the location is related to lands", () => {
    it("should return the decentraland's LAND section", () => {
      expect(
        getSection.resultFunc('', locations.lands(), VendorName.DECENTRALAND)
      ).toBe(Sections.decentraland.LAND)
    })
  })

  describe("when there's no section URL param, the vendor is Decentraland and the pathname is browse", () => {
    it("should return the decentraland's WEARABLES section", () => {
      expect(
        getSection.resultFunc('', locations.browse(), VendorName.DECENTRALAND)
      ).toBe(Sections.decentraland.WEARABLES)
    })
  })

  describe('when the section URL param is ALL, the vendor is Decentraland and the pathname is browse', () => {
    it("should return the decentraland's WEARABLES section", () => {
      expect(
        getSection.resultFunc(
          'section=all',
          locations.browse(),
          VendorName.DECENTRALAND
        )
      ).toBe(Sections.decentraland.WEARABLES)
    })
  })

  describe("when there's no section URL param, the vendor is Decentraland and the pathname is not browse but account", () => {
    it("should return the decentraland's ALL section", () => {
      expect(
        getSection.resultFunc('', locations.account(), VendorName.DECENTRALAND)
      ).toBe(Sections.decentraland.ALL)
    })
  })

  describe('when the section URL param is ALL, the vendor is Decentraland and the pathname is not browse but account', () => {
    it("should return the decentraland's ALL section", () => {
      expect(
        getSection.resultFunc(
          'section=all',
          locations.account(),
          VendorName.DECENTRALAND
        )
      ).toBe(Sections.decentraland.ALL)
    })
  })

  describe('when the section URL param exists in the vendor', () => {
    it("should return the vendor's section", () => {
      expect(
        getSection.resultFunc(
          'section=land',
          locations.lands(),
          VendorName.DECENTRALAND
        )
      ).toBe(Sections.decentraland.LAND)
    })
  })
})

describe("when there's no assetType URL param and the vendor is DECENTRALAND and the location is in browse", () => {
  it('should return ITEM as the assetType', () => {
    expect(
      getAssetType.resultFunc('', locations.browse(), VendorName.DECENTRALAND)
    ).toBe(AssetType.ITEM)
  })
})

describe("when there's assetType URL param, the assetType is not NFT or ITEM and the vendor is DECENTRALAND but the location is not in browse", () => {
  it('should return NFT as the assetType', () => {
    expect(
      getAssetType.resultFunc(
        'assetType=something',
        locations.lands(),
        VendorName.DECENTRALAND
      )
    ).toBe(AssetType.NFT)
  })
})

describe("when there's assetType URL param, the assetType is not NFT or ITEM and the vendor is DECENTRALAND and the location is in browse", () => {
  it('should return ITEM as the assetType', () => {
    expect(
      getAssetType.resultFunc(
        'assetType=something',
        locations.browse(),
        VendorName.DECENTRALAND
      )
    ).toBe(AssetType.ITEM)
  })
})

describe("when there's assetType URL param and the assetType is NFT", () => {
  it('should return NFT as the assetType', () => {
    expect(
      getAssetType.resultFunc(
        'assetType=nft',
        locations.browse(),
        VendorName.DECENTRALAND
      )
    ).toBe(AssetType.NFT)
  })
})

describe('when getting if it should look for NFTs that are for rent', () => {
  let url: string

  describe('and the onlyOnRent query param is set to true', () => {
    beforeEach(() => {
      url = 'onlyOnRent=true'
    })

    it('should return true', () => {
      expect(getOnlyOnRent.resultFunc(url)).toBe(true)
    })
  })

  describe('and the onlyOnRent query param is set to false', () => {
    beforeEach(() => {
      url = 'onlyOnRent=false'
    })

    it('should return false', () => {
      expect(getOnlyOnRent.resultFunc(url)).toBe(false)
    })
  })

  describe('and the onlyOnRent query param is not defined', () => {
    beforeEach(() => {
      url = ''
    })

    it('should return undefined', () => {
      expect(getOnlyOnRent.resultFunc(url)).toBe(undefined)
    })
  })
})

describe('when getting if the isMap parameter is set', () => {
  let url: string

  describe('and no isMap parameter is set', () => {
    beforeEach(() => {
      url = ''
    })

    it('should return undefined', () => {
      expect(getIsMap.resultFunc(url)).toBe(undefined)
    })
  })

  describe('and isMap is set as true', () => {
    beforeEach(() => {
      url = 'isMap=true'
    })

    it('should return true', () => {
      expect(getIsMap.resultFunc(url)).toBe(true)
    })
  })

  describe('and isMap is set as false', () => {
    beforeEach(() => {
      url = 'isMap=false'
    })

    it('should return false', () => {
      expect(getIsMap.resultFunc(url)).toBe(false)
    })
  })
})
